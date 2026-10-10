import test from 'node:test';
import assert from 'node:assert/strict';
import {localizedRoute,resolveLocale} from '../assets/js/routes.mjs';
test('switching language preserves page and article anchor',()=>{
  assert.equal(localizedRoute('de','guide','support-package'), 'de/guide/#support-package');
  assert.equal(localizedRoute('en','help','diagnose'), 'en/help/#diagnose');
  assert.equal(localizedRoute('de','home'), 'de/');
});
test('saved supported language wins; unsupported language falls back safely',()=>{
  assert.equal(resolveLocale('en',['de-DE']),'en');
  assert.equal(resolveLocale('xx',['de-AT','en']),'de');
  assert.equal(resolveLocale(null,['fr-FR']),'en');
  assert.equal(localizedRoute('xx','unrecognized'),'en/');
});
