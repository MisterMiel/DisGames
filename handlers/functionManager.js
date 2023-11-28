const fs = require('fs');
const path = require('path');

function readFolder(pathName){
  const res = [];
  const dirInfo = fs.readdirSync(pathName);
  for(let i = 0; i < dirInfo.length; i++){
    let filename = path.join(pathName, dirInfo[i]);
    let fileStat = fs.statSync(filename);
    if(fileStat.isFile()){
      res.push(filename);
    } else if(fileStat.isDirectory()){
      res.push(...readFolder(filename));
    } else continue;
  }
  return res;
}

const functionFiles = readFolder(path.join(process.cwd(), `./functions/`)).map(f => require(require.resolve(f)));

module.exports = functionFiles.reduce((o, i) => {
  let objKeys = Object.keys(i);
  let objValues = Object.values(i);

  for(let i = 0; i < objKeys.length; i++){
    o[objKeys[i]] = objValues[i];
  }

  return o;
}, {});