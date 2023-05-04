const fs = require('fs');
const path = require('path');

const pathToFile = path.resolve(__dirname, 'files');
const pathToNewFile = path.resolve(__dirname, 'files-copy');

fs.access(pathToNewFile, (err) => {
  if (err) {
    creatFolder ();
    copyFolder ();
    endCopy ();
  } else {
    cleanFolder ();
    copyFolder ();
    endCopy ();
  }
});

function creatFolder () {
  fs.mkdir(pathToNewFile, { recursive: true }, (err) => {
    if (err) console.log(err);
   }); 
}

function cleanFolder () {
  fs.readdir(pathToNewFile , (err, files) => {
    if (err) console.log(err);
    files.forEach(file => {
      const pathFile = path.resolve(pathToNewFile, file);
      fs.unlink(pathFile, (err) => {
        if (err) console.log(err); 
     });
    })
 });
}

function copyFolder () {
  fs.readdir(pathToFile , (err, files) => {
    files.forEach(file => {
      const pathOldFile = path.resolve(pathToFile, file);
      const pathFile = path.resolve(pathToNewFile, file);
      fs.copyFile(pathOldFile, pathFile, err => {
        if(err) throw err; 
     });
    })
  })
}

function endCopy () {
  console.log("Копирование завершено!")
}
