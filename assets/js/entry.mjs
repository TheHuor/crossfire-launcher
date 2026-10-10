import {resolveLocale} from './routes.mjs';
let saved=null;try{saved=JSON.parse(localStorage.getItem('cf-site-language'));}catch{}
location.replace(new URL(resolveLocale(saved,navigator.languages||[navigator.language])+'/',location.href));
