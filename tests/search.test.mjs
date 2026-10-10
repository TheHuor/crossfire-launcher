import test from 'node:test';import assert from 'node:assert/strict';
import {normalizeQuery,searchArticles} from '../assets/js/search.mjs';
const articles=[{id:'settings',title:'Einstellungen',summary:'Darstellung',keywords:['graphics'],sections:[{heading:'Übersicht',paragraphs:['Größe und Musik einstellen.']}]},{id:'updates',title:'Updates',summary:'Spielupdates',keywords:['update'],sections:[{heading:'Start',paragraphs:['Einstellungen vor dem Start prüfen.']}]}];
test('umlauts, sharp s and English UI terms find localized content',()=>{
 assert.equal(normalizeQuery('GRÖẞE'),'grosse');
 assert.equal(searchArticles('grosse',articles)[0].id,'settings');
 assert.equal(searchArticles('graphics',articles)[0].id,'settings');
 assert.equal(searchArticles('ubersicht',articles)[0].id,'settings');
});
test('titles rank above body text, while empty or unmatched queries return no results',()=>{
 assert.deepEqual(searchArticles('einstellungen',articles).map(x=>x.id),['settings','updates']);
 assert.deepEqual(searchArticles('   ',articles),[]);assert.deepEqual(searchArticles('nonexistent',articles),[]);
 assert.deepEqual(searchArticles('<img onerror=alert(1)>',articles),[]);
 assert.equal(searchArticles('einstellungen',articles,1).length,1);
});
