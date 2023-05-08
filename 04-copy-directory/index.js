const fs = require('fs');
const path = require('path');

const pathToFile = path.resolve(__dirname, 'files');
const pathToNewFile = path.resolve(__dirname, 'files-copy');

fs.access(pathToNewFile, (err) => {
  if (err) {
    creatFolder();
  } else {
    cleanAndCreatFolder ();
  }
});

async function creatFolder () {
  await fs.promises.mkdir(pathToNewFile, { recursive: true });
  copyFolder(pathToFile, pathToNewFile);
  endCopy();
}

async function cleanAndCreatFolder () {
  await fs.promises.rm(pathToNewFile, {recursive:true});
  await fs.promises.mkdir(pathToNewFile, {recursive:true});
  copyFolder(pathToFile, pathToNewFile);
  endCopy();
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

function endCopy () {
  console.log('Copy completed!');
}