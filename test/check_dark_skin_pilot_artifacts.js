// Negative regression: Sass staying unchanged must not hide artifact drift.
const fs = require('node:fs'), os = require('node:os'), path = require('node:path');
const assert = require('node:assert/strict');
const {publishArtifacts} = require('./dark_skin_pilot_artifacts');
const temporary = fs.mkdtempSync(path.join(os.tmpdir(),'chulapa-pilot-artifacts-'));
try {
  const output=path.join(temporary,'rendered'), destination=path.join(temporary,'committed');
  fs.mkdirSync(output);
  for(const width of [390,640]) fs.writeFileSync(path.join(output,`sample-comparison-${width}.png`),Buffer.from([1,2,width%256]));
  const report={tools:{chromium:'fixture'},skins:[{skin:'sample',primary:'#123456',modes:{dark:{contrast:[{ratio:5}],contrastFailures:[],keyboardStops:23}}}]};
  const reset=()=>publishArtifacts(report,output,destination,false);
  reset();publishArtifacts(report,output,destination,true);
  fs.appendFileSync(path.join(destination,'summary.json'),' ');
  assert.throws(()=>publishArtifacts(report,output,destination,true),/summary.json: committed artifact drift/);
  reset();fs.appendFileSync(path.join(destination,'sample-comparison-390.png'),'changed');
  assert.throws(()=>publishArtifacts(report,output,destination,true),/390.png: committed artifact drift/);
  reset();fs.unlinkSync(path.join(destination,'sample-comparison-640.png'));
  assert.throws(()=>publishArtifacts(report,output,destination,true),/640.png: committed artifact drift/);
  reset();fs.writeFileSync(path.join(destination,'stale.png'),'stale');
  assert.throws(()=>publishArtifacts(report,output,destination,true),/Unexpected committed pilot artifacts/);
  fs.unlinkSync(path.join(destination,'stale.png'));reset();
  report.skins[0].modes.dark.contrast[0].ratio=4.8;
  assert.throws(()=>publishArtifacts(report,output,destination,true),/summary.json: committed artifact drift/);
  console.log('Artifact checks reject stale summary, changed/missing PNG, unexpected files and measurement drift.');
} finally {fs.rmSync(temporary,{recursive:true,force:true});}
