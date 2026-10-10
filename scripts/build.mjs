import {readFile,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderPage,renderRoot} from './templates.mjs';
import {featureIds} from '../assets/js/routes.mjs';
const projectRoot=fileURLToPath(new URL('../',import.meta.url));
export async function buildSite({outputDir=projectRoot}={}){
 const write=async(rel,text)=>{const file=path.join(outputDir,rel);await mkdir(path.dirname(file),{recursive:true});await writeFile(file,text+'\n');};
 const contents={};
 for(const locale of ['de','en']){
  const c=JSON.parse(await readFile(path.join(projectRoot,'content',locale+'.json'),'utf8'));
  if(c.locale!==locale)throw new Error('Content locale mismatch');
  contents[locale]=c;
  for(const pageId of ['home','start','guide','help','features',...featureIds.map(id=>'features/'+id)]){
   const dir=pageId==='home'?`${locale}/`:`${locale}/${pageId}/`;
   await write(dir+'index.html',renderPage(c,pageId,pageId==='home'?'../':pageId.startsWith('features/')?'../../../':'../../'));
  }
 }
 await write('guide/index.html',renderPage(contents.en,'guide','../'));
 await write('index.html',renderRoot());
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 await buildSite();console.log(`Built ${2*(5+featureIds.length)} bilingual pages, legacy guide and language entry.`);
}
