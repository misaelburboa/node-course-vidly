// const log = require('./logger');
// log('message');



//Path Module
const path = require ('path');
var pathObj = path.parse(__filename);
// console.log(pathObj);


// OS Module
const os = require('os');
var totalMemory = os.totalmem();
var freeMemory = os.freemem();
console.log(`Total Memory: ${totalMemory}\nFree memory: ${freeMemory}\n`);


//Files Module
const fs = require('fs');
//const files = fs.readdirSync('./');
//console.log(files);
fs.readdir('./', function(err, files) {
    if (err) console.log('Error\n', err);
    else console.log('Result\n', files, "\n");
});

const Logger = require('./logger');
const logger = new Logger();

//register a listener
logger.on('messageLogged', (e) => {
    console.log('Listener called', e);
});

logger.log('message');



// Http Module
const http = require('http');
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello world');
        res.end();
    }
    if (req.url == '/api/courses') {
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
});


server.listen(3000);

console.log('Listening on port 3000...');