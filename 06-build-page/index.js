const fs = require('fs');
const path = require('path');

const pathToNewFile = path.resolve(__dirname, 'project-dist');
const pathToStyles = path.resolve(__dirname, 'styles');
const pathToNewStyle = path.resolve(__dirname, 'project-dist', 'style.css');
const pathToAssets = path.resolve(__dirname, 'assets');
const pathToNewAssets = path.resolve(__dirname, 'project-dist', 'assets');
const pathToIndex = path.resolve(__dirname, 'project-dist', 'index.html');
const pathToTemplate = path.resolve(__dirname, 'template.html');
const pathToComponents = path.resolve(__dirname, 'components');

fs.access(pathToNewFile, (err) => {
  if (err) {
    creatFolder();
  } else {
    cleanAndCreatFolder();
  }
  
});

async function creatFolder() {
  await fs.promises.mkdir(pathToNewFile, { recursive: true }); 
  await fs.promises.mkdir(pathToNewAssets, { recursive: true }); 
  addStyle();
  copyFolder(pathToAssets, pathToNewAssets);
  addIndex();
}

function addStyle() {
  const output = fs.createWriteStream(pathToNewStyle);

  fs.readdir(pathToStyles , (err, files) => {
    files.forEach(file => {
      const pathFile = path.resolve(pathToStyles, file);
      const fileExt = path.extname(pathFile);
      if(fileExt === '.css') {
        const input =  fs.createReadStream(pathFile);
        let data = '';
        input.on('data', chunk => data += chunk + '\n');
        input.on('error', error => console.log('Error', error.message));
        input.on('end', () => output.write(data));  
      }  
    });
  });
}

async function cleanAndCreatFolder() {
  await fs.promises.rm(pathToNewFile, {recursive:true});
  await fs.promises.mkdir(pathToNewFile, { recursive: true }); 
  await fs.promises.mkdir(pathToNewAssets, { recursive: true }); 
  addStyle();
  copyFolder(pathToAssets, pathToNewAssets);
  addIndex();
}

function copyFolder (oldPath, newPath) {
  fs.readdir(oldPath, {withFileTypes: true}, (err, files) => {
    files.forEach(file => {
      if(file.isDirectory()) {
        const newfolder = path.resolve(newPath, file.name);
        fs.mkdir(newfolder, { recursive: true }, (err) => {
          if (err) console.log(err);
        }); 
        const pathOldFile = path.resolve(oldPath, file.name);
        const pathNewFile = path.resolve(newPath, file.name);
        copyFolder (pathOldFile, pathNewFile); 
      } else {
        const pathOldFile = path.resolve(oldPath, file.name);
        const pathNewFile = path.resolve(newPath, file.name);
        fs.copyFile(pathOldFile, pathNewFile, err => {
          if(err) throw err; 
        });
      } 
    });
  });
}

function addIndex() {
  const input =  fs.createReadStream(pathToTemplate);
  let data = '';
  input.on('data', chunk => data += chunk);
  input.on('error', error => console.log('Error', error.message));
  input.on('end', () => {
    getIndexContent(data);
  });     
}

function getIndexContent(template) {
  fs.readdir(pathToComponents,{withFileTypes:true},(err,files)=>{
    if(err) console.log(err);
    replaceTagsByComponents(files, template);
      
  });
}

function  replaceTagsByComponents(files, indexContent) {
  files.forEach(file => {

    const pathFile = path.resolve(pathToComponents, file.name);
    const fileExt = path.extname(pathFile);
    if(fileExt === '.html') {

      const output = fs.createWriteStream(pathToIndex);
      const input =  fs.createReadStream(pathFile);
      let component = '';
      input.on('data', chunk => component += chunk);
      input.on('error', error => console.log('Error', error.message));
      input.on('end', () => {
        const fileName =  path.basename(pathFile, fileExt);
        indexContent =  indexContent.replace(`{{${fileName}}}`, component);
        output.write(indexContent);
      });  
    }  
  });
}