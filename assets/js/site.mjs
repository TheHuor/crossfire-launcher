import {initOnboarding} from './onboarding.mjs';
import {safeWrite,browserStorage} from './storage.mjs';
import {initSearch} from './search.mjs';
import {initSupport} from './support.mjs';
const dataNode=document.getElementById('site-data');
export function initSite(root=document){
 const c=JSON.parse(dataNode.textContent),u=c.ui;
 document.documentElement.classList.add('js');
 const menu=root.querySelector('.menu-toggle'),nav=root.querySelector('.main-navigation');
 const closeMenu=()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');};
 menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
 root.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
 root.querySelectorAll('[data-language]').forEach(a=>{
  a.href=a.href.split('#')[0]+location.hash;
  a.addEventListener('click',()=>{safeWrite(browserStorage(),'cf-site-language',a.dataset.language);});
 });
 window.addEventListener('hashchange',()=>root.querySelectorAll('[data-language]').forEach(a=>{a.href=a.href.split('#')[0]+location.hash;}));
 const panels=[...root.querySelectorAll('[data-feature-panel]')],featureLinks=[...root.querySelectorAll('[data-feature]')];
 const selectFeature=id=>{if(!panels.some(p=>p.dataset.featurePanel===id))id='updates';panels.forEach(p=>p.hidden=p.dataset.featurePanel!==id);featureLinks.forEach(a=>{if(a.dataset.feature===id)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});};
 if(panels.length){selectFeature(location.hash.startsWith('#feature-')?location.hash.slice(9):'updates');featureLinks.forEach(a=>a.addEventListener('click',()=>selectFeature(a.dataset.feature)));window.addEventListener('hashchange',()=>{if(location.hash.startsWith('#feature-'))selectFeature(location.hash.slice(9));});}
 const dialog=root.querySelector('.image-dialog');let imageTrigger=null;
 root.querySelectorAll('.hero-art>img,.inline-art>img').forEach(img=>{
  const open=root.createElement('button');open.type='button';open.className='image-open';open.setAttribute('aria-label',u.imageZoom);img.before(open);open.append(img);
  open.addEventListener('click',()=>{imageTrigger=open;const large=dialog.querySelector('img:not(.icon)');large.src=img.src;large.alt=img.alt;dialog.querySelector('p').textContent=img.alt;dialog.showModal();});
 });
 dialog.querySelector('[data-close-image]').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>imageTrigger?.focus());
 return c;
}
const content=initSite();
initOnboarding();
initSearch(document,content.articles,content.locale);
initSupport(document,content.supportNodes,content.locale);

