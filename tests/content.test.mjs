import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
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
