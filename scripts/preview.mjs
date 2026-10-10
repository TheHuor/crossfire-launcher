import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const arg=(name,fallback)=>{const i=process.argv.indexOf(name);return i<0?fallback:process.argv[i+1];};
const port=Number(arg('--port','4173'));
const base='/'+arg('--base','').replace(/^\/+|\/+$/g,'');
const prefix=base==='/'?'/':base+'/';
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2'};
http.createServer(async(req,res)=>{
 try {
  const pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
  if(pathname===base&&base!=='/'){res.writeHead(302,{Location:prefix});res.end();return;}
  if(!pathname.startsWith(prefix)){res.writeHead(404);res.end('Not found');return;}
  const file=path.resolve(root,pathname.slice(prefix.length));
  if(file!==path.resolve(root)&&!file.startsWith(path.resolve(root)+path.sep)){res.writeHead(403);res.end('Forbidden');return;}
  if(path.relative(root,file).split(path.sep).some(p=>p.startsWith('.'))){res.writeHead(403);res.end('Forbidden');return;}
  const info=await stat(file);
  if(info.isDirectory()&&!pathname.endsWith('/')){res.writeHead(302,{Location:pathname+'/'});res.end();return;}
  const actual=info.isDirectory()?path.join(file,'index.html'):file;
  const body=await readFile(actual);
  res.writeHead(200,{'Content-Type':mime[path.extname(actual)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(body);
 }catch{res.writeHead(404);res.end('Not found');}
}).listen(port,'127.0.0.1',()=>console.log(`Preview: http://127.0.0.1:${port}${prefix}`));
