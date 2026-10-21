// Shared publication/check path: every committed review artifact is derived here.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
function publishArtifacts(report, output, destination, check) {
  if (!check) fs.mkdirSync(destination, {recursive:true});
  const summary = {
    experimental:true,
    tools:report.tools,
    individualViewportWidths:[390,1280],
    comparisonPaneWidths:[390,640],
    skins:report.skins.map(s=>({skin:s.skin,primary:s.primary,modes:Object.fromEntries(
      Object.entries(s.modes).map(([mode,{contrast,contrastFailures,...styles}])=>[mode,{
        ...styles,measurements:contrast.length,
        minimumTextContrast:Math.min(...contrast.map(c=>c.ratio)),contrastFailures
      }]))}))
  };
  const artifacts = new Map([['summary.json',Buffer.from(JSON.stringify(summary,null,2)+'\n')]]);
  for (const {skin} of report.skins) for (const width of [390,640]) {
    const name = `${skin}-comparison-${width}.png`;
    artifacts.set(name,fs.readFileSync(path.join(output,name)));
  }
  for (const [name,content] of artifacts) {
    const file = path.join(destination,name);
    if (check) assert.ok(fs.existsSync(file) && fs.readFileSync(file).equals(content),
      `${name}: committed artifact drift; regenerate with the documented browser/font environment`);
    else fs.writeFileSync(file,content);
  }
  const unexpected = fs.readdirSync(destination).filter(name=>!artifacts.has(name));
  assert.deepEqual(unexpected,[],`Unexpected committed pilot artifacts: ${unexpected.join(', ')}`);
  return summary;
}
module.exports = {publishArtifacts};
