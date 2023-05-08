const fs = require('fs');
const path = require('path');

const pathToFile = path.resolve(__dirname, 'file.txt');
const output = fs.createWriteStream(pathToFile);

const { stdin, stdout } = process;
stdout.write('Hello! Please, write something.\n');
stdin.on('data', data => {
  if(data.toString().trim() === 'exit') {
    process.exit();
  } 
  output.write(data);
});

process.on('exit', () => stdout.write('Goodbye! See you!'));
process.on('SIGINT', () => process.exit());


