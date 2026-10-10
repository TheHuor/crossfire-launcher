export function browserStorage(){try{return window.localStorage;}catch{return null;}}
export function safeRead(storage,key,fallback){
 try{const text=storage?.getItem(key);return text===null||text===undefined?fallback:JSON.parse(text);}catch{return fallback;}
}
export function safeWrite(storage,key,value){
 try{if(!storage)return false;storage.setItem(key,JSON.stringify(value));return true;}catch{return false;}
}
