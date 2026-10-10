const locales=['de','en'];
export function resolveLocale(savedLocale,browserLanguages=[]){
 if(locales.includes(savedLocale))return savedLocale;
 for(const language of browserLanguages){const base=String(language).toLowerCase().split('-')[0];if(locales.includes(base))return base;}
 return 'en';
}
export function localizedRoute(locale,pageId,anchor=''){
 const lang=locales.includes(locale)?locale:'en';
 const page=['start','guide','help'].includes(pageId)?`${pageId}/`:'';
 return `${lang}/${page}${anchor?'#'+encodeURIComponent(anchor.replace(/^#/,'')):''}`;
}
