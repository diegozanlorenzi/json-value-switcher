import JsonValueSwitcher from './lib/JsonValueSwitcher.js'; 

const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./file-settings.json').toString());

const json = JSON.parse(fs.readFileSync(`./input/${config.inputFileName}`).toString());

let switchedJson = JsonValueSwitcher.switch(json);

const data = new Uint8Array(Buffer.from(JSON.stringify(switchedJson, null, 2)));
fs.writeFile(`./output/${config.outputFileName}`, data, (err) => {
  if (err) throw err;
  console.log(`Switched JSON file ${config.outputFileName} generated`);
});

console.log(switchedJson);

