import {browserStorage,safeRead,safeWrite} from './storage.mjs';
export function normalizeProgress(value,validIds){return Array.isArray(value)?validIds.filter(id=>value.includes(id)):[];}
export function setStepCompleted(progress,stepId,completed,validIds){
 const clean=normalizeProgress(progress,validIds);
 return normalizeProgress(completed?[...clean,stepId]:clean.filter(id=>id!==stepId),validIds);
}
export function initOnboarding(root=document){
 const host=root.querySelector('[data-onboarding]');if(!host)return;
 const c=JSON.parse(root.getElementById('site-data').textContent),u=c.ui;
 const ids=c.onboardingSteps.map(s=>s.id),storage=browserStorage(),key='cf-site-onboarding-v1';
 let progress=normalizeProgress(safeRead(storage,key,[]),ids);
 const storageStatus=host.querySelector('[data-storage-status]');
 const render=()=>{
  host.querySelector('progress').value=progress.length;
  host.querySelector('[data-progress-text]').textContent=progress.length+' '+u.progressUnit;
  host.querySelectorAll('[data-complete-step]').forEach(box=>{box.checked=progress.includes(box.dataset.completeStep);});
  host.querySelectorAll('[data-step-link]').forEach(a=>{a.classList.toggle('completed',progress.includes(a.dataset.stepLink));});
 };
 const select=(id,focus=false)=>{
  const selected=ids.includes(id)?id:ids[0];
  host.querySelectorAll('[data-step-panel]').forEach(p=>{p.hidden=p.dataset.stepPanel!==selected;if(!p.hidden&&focus){p.querySelector('h2').focus({preventScroll:true});p.scrollIntoView({block:'start'});}});
  host.querySelectorAll('[data-step-link]').forEach(a=>{if(a.dataset.stepLink===selected)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current');});
 };
 host.querySelectorAll('[data-complete-step]').forEach(box=>box.addEventListener('change',()=>{
  progress=setStepCompleted(progress,box.dataset.completeStep,box.checked,ids);
  if(!safeWrite(storage,key,progress))storageStatus.textContent=u.storageNotice;render();
 }));
 host.querySelector('[data-reset-progress]').addEventListener('click',()=>{
  progress=[];storageStatus.textContent=safeWrite(storage,key,progress)?u.resetDone:u.storageNotice;render();
 });
 window.addEventListener('hashchange',()=>{if(ids.includes(location.hash.slice(1)))select(location.hash.slice(1),true);});
 select(location.hash.slice(1));render();
}
