import fs from 'node:fs';
import assert from 'node:assert/strict';

const html=fs.readFileSync('index.html','utf8');
const script=fs.readFileSync('app.js','utf8');
const ids=[...script.matchAll(/\$\('([^']+)'\)/g)].map(match=>match[1]);
for(const id of new Set(ids)) assert.match(html,new RegExp(`id=["']${id}["']`),`Missing DOM id: ${id}`);
for(const file of ['index.html','styles.css','app.js','manifest.webmanifest','sw.js','icon.svg','.github/workflows/pages.yml']) assert.ok(fs.existsSync(file),`Missing ${file}`);
assert.match(script,/parseSubtitles/);
assert.match(script,/mode==='shadowing'/);
assert.match(script,/video\.currentTime/);
assert.match(script,/localStorage/);
assert.match(html,/data-subtitle="off"/);
assert.match(html,/id="subtitleInput"/);
console.log(`Validated ${new Set(ids).size} DOM bindings and the complete PWA surface.`);
