import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
import {nextSupportNode,previousSupportNode,formatReport} from '../assets/js/support.mjs';
const de=JSON.parse(await readFile(new URL('../content/de.json',import.meta.url),'utf8'));
const en=JSON.parse(await readFile(new URL('../content/en.json',import.meta.url),'utf8'));
test('every troubleshooting choice reaches its declared node without getting stuck',()=>{
 for(const c of [de,en])for(const n of c.supportNodes)for(let i=0;i<n.choices.length;i++)assert.equal(nextSupportNode(c.supportNodes,n.id,i),n.choices[i].nextId);
 assert.equal(nextSupportNode(de.supportNodes,'missing',0),'start');
 assert.equal(nextSupportNode(de.supportNodes,'start',99),'start');
});
test('back removes a visit and empty history returns to the start',()=>{
 assert.deepEqual(previousSupportNode(['start','update']),{currentId:'update',history:['start']});
 assert.deepEqual(previousSupportNode([]),{currentId:'start',history:[]});
});
test('reports use translated fields and keep user-entered diagnostic detail',()=>{
 assert.match(formatReport(de,{0:'2.0',3:'Fehler 123'}),/Launcher-Version:\n2\.0/);
 assert.match(formatReport(de,{0:'2.0',3:'Fehler 123'}),/Was passiert:\nFehler 123/);
 assert.match(formatReport(en,{}),/What happened:\nPlease fill in/);
 assert.doesNotMatch(formatReport(en,{}),/Bitte ergänzen/);
});
