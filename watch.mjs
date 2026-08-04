import { watch } from 'node:fs';
import { spawn } from 'node:child_process';

let building = false;
function build() { if (building) return; building = true; const child = spawn(process.execPath, ['build.mjs'], { stdio: 'inherit' }); child.on('exit', () => { building = false; }); }
build();
watch('profile.md', { persistent: true }, (event) => { if (event === 'change') build(); });
console.log('Watching profile.md for changes…');
