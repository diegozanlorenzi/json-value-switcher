import JsonValueSwitcher from './lib/JsonValueSwitcher.js'; 

const fs = require('fs');

//Change the desired input and output files in the file-settings.json
const config  = JSON.parse(fs.readFileSync('./file-settings.json').toString());

const json = JSON.parse(fs.readFileSync(`./input/${config.inputFileName}`).toString());

let switchedJson = JsonValueSwitcher.switch(json);

const switchedJsonData = new Uint8Array(Buffer.from(JSON.stringify(switchedJson, null, 2)));

fs.writeFile(`./output/${config.outputFileName}`, switchedJsonData, (err) => {
  if (err) throw err;
  console.log(`Switched JSON file ${config.outputFileName} generated in folder /output`);
});
