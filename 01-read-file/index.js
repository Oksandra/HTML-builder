const fs = require('fs');
const path = require('path');

const pathToFile = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(pathToFile);

let data = '';

stream.on('data', chunk => data += chunk);
stream.on('error', error => console.log('Error', error.message));
stream.on('end', () => console.log(data))