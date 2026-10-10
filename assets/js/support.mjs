import {localizedRoute} from './routes.mjs';
export function nextSupportNode(nodes,currentId,choiceIndex){
 const nextId=nodes.find(n=>n.id===currentId)?.choices[choiceIndex]?.nextId;
 return nodes.some(n=>n.id===nextId)?nextId:'start';
}
export function previousSupportNode(history){const clean=[...history];return {currentId:clean.pop()||'start',history:clean};}
export function formatReport(content,answers={}){return content.ui.reportFields.map((field,i)=>`${field}\n${String(answers[i]??content.ui.reportDefault)}`).join('\n\n');}
export function supportLanguageHash(currentId,hash,sectionIds){return sectionIds.includes(hash.slice(1))?hash:(currentId==='start'?'':'#'+currentId);}
export function initSupport(root,nodes,locale){
 const host=root.querySelector('.assistant');if(!host)return;
 const content=JSON.parse(root.getElementById('site-data').textContent),u=content.ui,base=root.body.dataset.base;
 const container=host.querySelector('[data-assistant-content]'),back=host.querySelector('[data-assistant-back]');
 const sectionIds=[...root.querySelectorAll('[id]')].map(el=>el.id);
 let currentId=nodes.some(n=>n.id===location.hash.slice(1))?location.hash.slice(1):'start',visits=[];
 const makeIcon=()=>{const image=root.createElement('img');image.src=base+'assets/icons/arrow-right.svg';image.className='icon';image.alt='';image.setAttribute('aria-hidden','true');return image;};
 const render=(focus=false)=>{
  const n=nodes.find(n=>n.id===currentId)||nodes.find(n=>n.id==='start');currentId=n.id;
  const h=root.createElement('h2'),p=root.createElement('p');h.textContent=n.title;h.tabIndex=-1;p.textContent=n.body;
  container.id=n.id;container.replaceChildren(h,p);
  if(n.choices.length){
   const choices=root.createElement('div');choices.className='assistant-choices';
   n.choices.forEach((choice,i)=>{const button=root.createElement('button');button.type='button';button.append(root.createTextNode(choice.label),makeIcon());button.addEventListener('click',()=>{visits.push(currentId);currentId=nextSupportNode(nodes,currentId,i);window.history.pushState(null,'','#'+currentId);render(true);});choices.append(button);});container.append(choices);
  }
  if(n.articleIds.length){
   const related=root.createElement('div'),title=root.createElement('h3');related.className='assistant-related';title.textContent=u.related;related.append(title);
   for(const id of n.articleIds){const a=root.createElement('a');a.className='text-link';a.href=base+localizedRoute(locale,'guide',id);a.append(root.createTextNode(content.articles.find(a=>a.id===id).title),makeIcon());related.append(a);}container.append(related);
  }
  back.hidden=visits.length===0;
  if(!n.choices.length){const a=root.createElement('a');a.className='text-link';a.href='#report';a.textContent=u.supportTitle;container.append(a);}
  root.querySelectorAll('[data-language]').forEach(a=>{a.href=a.href.split('#')[0]+supportLanguageHash(currentId,location.hash,sectionIds);});
  if(focus)h.focus({preventScroll:true});
 };
 back.addEventListener('click',()=>{const prior=previousSupportNode(visits);currentId=prior.currentId;visits=prior.history;window.history.replaceState(null,'','#'+currentId);render(true);});
 host.querySelector('[data-assistant-reset]').addEventListener('click',()=>{currentId='start';visits=[];window.history.replaceState(null,'',location.pathname);render(true);});
 window.addEventListener('popstate',()=>{const id=location.hash.slice(1);currentId=nodes.some(n=>n.id===id)?id:'start';visits=[];render();});
 const template=root.getElementById('report-template'),status=root.querySelector('[data-copy-status]');template.value=formatReport(content);
 root.querySelector('[data-copy-report]').addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(template.value);status.textContent=u.copied;}catch{status.textContent=u.copyFallback;template.focus();template.select();}
 });
 render();
}

