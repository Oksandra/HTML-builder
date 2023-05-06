const fs = require('fs');
const path = require('path');

const pathToFile = path.resolve(__dirname, 'styles');
const pathToCreatFile = path.resolve(__dirname, 'project-dist', 'bundle.css');

const output = fs.createWriteStream(pathToCreatFile);

fs.readdir(pathToFile , (err, files) => {

  files.forEach(file => {
    const pathFile = path.resolve(pathToFile, file);
    const fileExt = path.extname(pathFile);
  if(fileExt === '.css') {
    const input =  fs.createReadStream(pathFile);
    let data = '';
    input.on('data', chunk => data += chunk + '\n');
    input.on('end', () => output.write(data));  
  }  
  })
  console.log('Done!')
})
