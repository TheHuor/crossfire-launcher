import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {localizedRoute} from '../assets/js/routes.mjs';
import {renderPage} from '../scripts/templates.mjs';
test('chronicle links retain language and version anchors',()=>{
 assert.equal(localizedRoute('de','history','v1-7-3'),'de/history/#v1-7-3');
 assert.equal(localizedRoute('en','history','v0-9-1'),'en/history/#v0-9-1');
});
test('player chronicle is bilingual, ordered and renders every documented entry',async()=>{
 const contents=await Promise.all(['de','en'].map(async l=>JSON.parse(await readFile(new URL('../content/'+l+'.json',import.meta.url),'utf8'))));
 const shape=c=>c.history.entries.map(v=>[v.version,v.date,v.relatedIds]);
 assert.ok(contents.every(c=>Array.isArray(c.history?.entries)));
 assert.deepEqual(shape(contents[0]),shape(contents[1]));
 for(const c of contents){
  const entries=c.history.entries;
  assert.equal(entries[0].version,'1.7.4');assert.equal(entries.at(-1).version,'0.9.1');
  assert.ok(entries.length>=10);
  const html=renderPage(c,'history','../../');
  for(const [index,v]of entries.entries()){
   assert.match(v.date,/^\d{4}-\d{2}-\d{2}$/);assert.ok(v.title&&v.notes.length);
   if(index)assert.ok(entries[index-1].date>=v.date);
   assert.ok(html.includes('id="v'+v.version.replaceAll('.','-')+'"'));
   for(const id of v.relatedIds)assert.ok(c.featurePages.some(p=>p.id===id));
  }
  assert.match(html,/<time datetime=/);
  assert.match(html,/history\/#[^"]+/);
 }
});
