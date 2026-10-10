import test from 'node:test';import assert from 'node:assert/strict';
import {normalizeProgress,setStepCompleted} from '../assets/js/onboarding.mjs';
import {safeRead,safeWrite} from '../assets/js/storage.mjs';
const ids=['freelancer','crossfire','launcher-update','setup','play'];
test('completion is unique, ordered, removable and rejects stale IDs',()=>{
 assert.deepEqual(normalizeProgress(['play','crossfire','crossfire','obsolete'],ids),['crossfire','play']);
 assert.deepEqual(setStepCompleted(['crossfire'],'freelancer',true,ids),['freelancer','crossfire']);
 assert.deepEqual(setStepCompleted(['freelancer','crossfire'],'freelancer',false,ids),['crossfire']);
 assert.deepEqual(setStepCompleted([],'obsolete',true,ids),[]);
 assert.deepEqual(normalizeProgress({complete:true},ids),[]);
});
test('blocked storage and corrupted JSON never prevent progress updates',()=>{
 const blocked={getItem(){throw Error('blocked');},setItem(){throw Error('blocked');}};
 assert.deepEqual(safeRead(blocked,'progress',[]),[]);assert.equal(safeWrite(blocked,'progress',[]),false);
 assert.deepEqual(safeRead({getItem:()=>'{broken'},'progress',[]),[]);
 const values=new Map();const storage={getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v)};
 assert.equal(safeWrite(storage,'progress',['freelancer']),true);assert.deepEqual(safeRead(storage,'progress',[]),['freelancer']);
 assert.equal(safeWrite(storage,'progress',[]),true);assert.deepEqual(safeRead(storage,'progress',null),[]);
});
