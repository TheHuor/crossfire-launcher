import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {featureIds} from '../assets/js/routes.mjs';
const load = locale => readFile(new URL(`../content/${locale}.json`, import.meta.url), 'utf8').then(JSON.parse);
test('both languages provide the same complete article, section and onboarding IDs', async () => {
  const [de,en] = await Promise.all([load('de'),load('en')]);
  const shape = c => ({articles:c.articles.map(a=>[a.id,a.sections.map(s=>s.id)]),steps:c.onboardingSteps.map(s=>s.id),features:c.features.map(f=>f.id),support:c.supportNodes.map(n=>[n.id,n.choices.map(x=>x.nextId)])});
  assert.deepEqual(shape(de),shape(en));
  for(const c of [de,en]) {
    assert.deepEqual(c.onboardingSteps.map(s=>s.id),['freelancer','crossfire','launcher-update','setup','play']);
    assert.equal(c.links.download,'https://swat-portal.com/forum/filebase/file/1098-crossfire-2-0-client-edition/');
    assert.match(c.links.support,/swat-portal\.com\/forum\/board\/4-technical-problems/);
    assert.ok(c.articles.length>=8);
    const articleIds=c.articles.map(a=>a.id), nodeIds=c.supportNodes.map(n=>n.id);
    for(const n of c.supportNodes) {
      for(const a of n.articleIds) assert.ok(articleIds.includes(a));
      for(const ch of n.choices) assert.ok(nodeIds.includes(ch.nextId));
    }
    const leafStrings = value => typeof value==='string'?[value]:typeof value==='object'&&value?Object.values(value).flatMap(leafStrings):[];
    for(const s of leafStrings(c)) { assert.ok(s.trim()); assert.doesNotMatch(s,/\b(?:TODO|TBD)\b/); }
  }
});
test('feature instructions and screenshot references stay aligned in both languages',async()=>{
 const [de,en]=await Promise.all([load('de'),load('en')]);
 const shape=c=>c.featurePages.map(p=>[p.id,p.shots,p.sectionShots,p.relatedIds,p.steps.length]);
 assert.deepEqual(shape(de),shape(en));
 assert.deepEqual(de.featurePages.map(p=>p.id),featureIds);
 for(const c of [de,en]){
  const articles=c.articles.map(a=>a.id),shots=c.launcherShots.map(s=>s.id);
  for(const p of c.featurePages){
   assert.ok(articles.includes(p.id));
   assert.ok(p.steps.length>=3);
   for(const id of p.relatedIds)assert.ok(featureIds.includes(id));
   for(const id of p.shots)assert.ok(shots.includes(id));
   for(const [section,ids] of Object.entries(p.sectionShots??{})){
    assert.ok(c.articles.find(a=>a.id===p.id).sections.some(s=>s.id===section));
    for(const id of ids)assert.ok(shots.includes(id));
   }
  }
  for(const s of c.launcherShots){
   assert.ok(s.alt&&s.caption&&(s.version||s.credit));
   assert.match(s.file,/^[a-z0-9-]+\.(?:png|jpg)$/);
   const bytes=await readFile(new URL('../assets/images/screenshots/'+s.file,import.meta.url));
   if(s.file.endsWith('.png')){
    assert.equal(bytes.readUInt32BE(16),s.width);
    assert.equal(bytes.readUInt32BE(20),s.height);
   }else{
    assert.equal(bytes.readUInt16BE(0),0xffd8);
    let offset=2,dimensions;
    while(offset<bytes.length){
     const marker=bytes.readUInt16BE(offset),length=bytes.readUInt16BE(offset+2);
     if([0xffc0,0xffc1,0xffc2].includes(marker)){dimensions=[bytes.readUInt16BE(offset+7),bytes.readUInt16BE(offset+5)];break;}
     offset+=length+2;
    }
    assert.deepEqual(dimensions,[s.width,s.height]);
   }
  }
 }
});
