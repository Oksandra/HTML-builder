const fs = require('fs');
const path = require('path');

const pathToFile = path.resolve(__dirname, 'secret-folder');

fs.readdir(pathToFile, {withFileTypes: true} , (err, files) => {
  if (err) console.log(err);

  files.forEach(file => {
    if(file.isFile()) {
      const pathFile = path.resolve(pathToFile, file.name);
      const fileExt = path.extname(pathFile);
      const fileName = path.basename(pathFile, fileExt);

       fs.stat(pathFile, (err, stats) => {
        if (err) console.log(err);
        console.log(`${fileName} - ${fileExt.slice(1)} - ${stats.size}b`);
      });
     ;
    }
  })
});