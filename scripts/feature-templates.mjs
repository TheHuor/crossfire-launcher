export function renderFeatures(c,pageId,{e,link,asset,icon,source,title}){
 const u=c.ui,article=id=>c.articles.find(a=>a.id===id);
 const shots=ids=>ids.map(id=>{
  const s=c.launcherShots.find(s=>s.id===id);
  return `<figure class="launcher-shot"><img src="${asset('images/screenshots/'+s.file)}" alt="${e(s.alt)}" width="${s.width}" height="${s.height}" loading="lazy"><figcaption><strong>${e(s.caption)}</strong><span>${e(s.version?u.screenshotVersion+' '+s.version:s.credit)}</span></figcaption></figure>`;
 }).join('');
 const cards=ids=>`<div class="function-grid">${ids.map(id=>{
  const p=c.featurePages.find(p=>p.id===id),a=article(id);
  return `<a class="function-card" href="${link('features/'+id)}">${icon(p.icon,'accent-icon')}<h2>${e(a.title)}</h2><p>${e(a.summary)}</p><span class="text-link">${e(u.featureDetails)}${icon('arrow-right')}</span></a>`;
 }).join('')}</div>`;
 if(pageId==='features')return `<div class="container"><nav class="breadcrumbs" aria-label="${e(u.breadcrumbs)}"><a href="${link('home')}">${e(u.home)}</a><span aria-hidden="true">/</span><span>${e(u.functions)}</span></nav>${title(u.functions,e(u.functionsTitle),u.functionsIntro)}${shots(['home'])}${cards(c.featurePages.map(p=>p.id))}</div>`;
 const id=pageId.slice('features/'.length),p=c.featurePages.find(p=>p.id===id),a=article(id);
 return `<div class="container"><nav class="breadcrumbs" aria-label="${e(u.breadcrumbs)}"><a href="${link('home')}">${e(u.home)}</a><span aria-hidden="true">/</span><a href="${link('features')}">${e(u.functions)}</a><span aria-hidden="true">/</span><span>${e(a.title)}</span></nav>${title(u.functions,e(a.title),a.summary)}<div class="function-detail"><aside class="guide-sidebar"><nav aria-label="${e(u.contents)}"><p class="eyebrow">${e(u.contents)}</p><a href="#workflow">${e(u.workflow)}</a>${a.sections.map(s=>`<a href="#${s.id}">${e(s.heading)}</a>`).join('')}<a href="${link('features')}">${icon('arrow-left')}${e(u.allFunctions)}</a></nav></aside><article class="function-article">${shots(p.shots)}<section class="workflow" id="workflow"><p class="eyebrow">${e(u.workflow)}</p><h2>${e(p.workflowTitle)}</h2><ol class="workflow-steps">${p.steps.map((s,i)=>`<li><span class="step-number">${i+1}</span><div><h3>${e(s.title)}</h3><p>${e(s.body)}</p></div></li>`).join('')}</ol></section>${a.sections.map(s=>`<section class="function-section" id="${s.id}"><h2>${e(s.heading)}</h2>${shots(p.sectionShots?.[s.id]??[])}${s.paragraphs.map(p=>`<p>${e(p)}</p>`).join('')}</section>`).join('')}<div class="article-footer">${source(a.source)}<a class="text-link" href="${link('help')}">${e(u.findHelp)}${icon('arrow-right')}</a></div></article></div><section class="related-functions"><h2>${e(u.related)}</h2>${cards(p.relatedIds)}</section></div>`;
}
