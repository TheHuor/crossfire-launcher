import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,rm,cp,access} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {buildSite} from '../scripts/build.mjs';
test('build produces readable bilingual pages with valid links at root and Pages prefix',async()=>{
 const dir=await mkdtemp(path.join(tmpdir(),'cf-build-'));
 try {
  await cp(new URL('../assets',import.meta.url),path.join(dir,'assets'),{recursive:true});
  await buildSite({outputDir:dir});
  const routes=['','guide/','de/','en/',...['de','en'].flatMap(l=>['start','guide','help'].map(p=>`${l}/${p}/`))];
  for(const route of routes){
   const html=await readFile(path.join(dir,route,'index.html'),'utf8');
   assert.match(html,/<html lang="(?:de|en)"/);
   if(route.includes('guide')) assert.match(html,/launcher\.log/);
   for(const prefix of ['/', '/crossfire-launcher/']) {
    const pageUrl=new URL(`${prefix}${route}`,'https://example.test');
    for(const [,url] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
     if(url.startsWith('http')||url.startsWith('mailto:'))continue;
     const target=new URL(url,pageUrl);
     assert.ok(target.pathname.startsWith(prefix));
     const rel=decodeURIComponent(target.pathname.slice(prefix.length));
     const disk=path.join(dir,rel.endsWith('/')?rel+'index.html':rel);
     await access(disk);
     if(target.hash){
      const body=await readFile(disk,'utf8');
      assert.ok(body.includes(`id="${decodeURIComponent(target.hash.slice(1))}"`),`${route}: broken anchor ${url}`);
     }
    }
   }
  }
 } finally {await rm(dir,{recursive:true,force:true});}
});
