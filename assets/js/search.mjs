import {localizedRoute} from './routes.mjs';
export function normalizeQuery(text){return String(text??'').toLowerCase().replace(/ß/g,'ss').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();}
export function searchArticles(query,articles,limit=8){
 const tokens=normalizeQuery(String(query).slice(0,120)).split(' ').filter(Boolean);if(!tokens.length)return [];
 return articles.map(article=>{
  const title=normalizeQuery(article.title),summary=normalizeQuery(article.summary),keywords=normalizeQuery(article.keywords.join(' '));
  const body=normalizeQuery(article.sections.flatMap(s=>[s.heading,...s.paragraphs]).join(' '));
  if(!tokens.every(t=>[title,summary,keywords,body].some(field=>field.includes(t))))return {id:article.id,score:0};
  const score=tokens.reduce((total,t)=>total+(title===t?80:title.includes(t)?40:0)+(keywords.includes(t)?20:0)+(summary.includes(t)?8:0)+(body.includes(t)?2:0),0);
  return {id:article.id,score};
 }).filter(r=>r.score>0).sort((a,b)=>b.score-a.score).slice(0,Math.max(0,limit));
}
export function initSearch(root,articles,locale){
 const form=root.querySelector('.search-form');if(!form)return;
 const c=JSON.parse(root.getElementById('site-data').textContent),u=c.ui;
 const input=form.querySelector('input'),results=root.getElementById('search-results'),list=results.querySelector('[data-search-list]'),status=results.querySelector('[data-search-status]');
 const render=()=>{
  results.hidden=false;list.replaceChildren();
  const matches=searchArticles(input.value,articles);
  status.textContent=!input.value.trim()?u.emptySearch:matches.length?`${matches.length} ${u.resultCount}`:u.noResults;
  for(const match of matches){
   const article=articles.find(a=>a.id===match.id),li=root.createElement('li'),a=root.createElement('a'),title=root.createElement('strong'),summary=root.createElement('span');
   a.href=root.body.dataset.base+localizedRoute(locale,'guide',article.id);title.textContent=article.title;summary.textContent=article.summary;a.append(title,summary);li.append(a);list.append(li);
  }
 };
 form.addEventListener('submit',event=>{event.preventDefault();render();});
 input.addEventListener('input',()=>{if(input.value.trim())render();else results.hidden=true;});
 results.querySelector('[data-clear-search]').addEventListener('click',()=>{input.value='';results.hidden=true;input.focus();});
 input.addEventListener('keydown',event=>{if(event.key==='Escape')results.hidden=true;});
}
