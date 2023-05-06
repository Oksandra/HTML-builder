const fs = require('fs');
const path = require('path');

const pathToFile = path.resolve(__dirname, 'files');
const pathToNewFile = path.resolve(__dirname, 'files-copy');

fs.access(pathToNewFile, (err) => {
  if (err) {
    creatFolder ();
    copyFolder(pathToFile, pathToNewFile);
    endCopy ();
  } else {
    cleanFolder (pathToNewFile)
    copyFolder(pathToFile, pathToNewFile);
    endCopy ();
  }
});

function creatFolder () {
  fs.mkdir(pathToNewFile, { recursive: true }, (err) => {
    if (err) console.log(err);
   }); 
}

function cleanFolder (currentPath) {
  fs.readdir(currentPath, {withFileTypes: true}, (err, files) => {
  if (err) console.log(err);
  files.forEach(file => {
  if(file.isDirectory()) {
  const pathFile = path.resolve(currentPath, file.name);
  cleanFolder (pathFile);
  } else {
  const pathFile = path.resolve(currentPath, file.name);
  fs.unlink(pathFile, (err) => {
  if (err) console.log(err);
  });
  }
  })
  });
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
        copyFolder (pathOldFile, pathNewFile) 
      } else {
        const pathOldFile = path.resolve(oldPath, file.name);
        const pathNewFile = path.resolve(newPath, file.name);
        fs.copyFile(pathOldFile, pathNewFile, err => {
          if(err) throw err; 
       });
      } 
    })
  })
}

function endCopy () {
  console.log("Copy completed!")
}
