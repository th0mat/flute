// archiver.js creates a zip file for users to download and install
// MagicFlute
//
// MagicFlute.zip is copied into the Downloads folder. Any existing versions are
// deleted first.


const fs = require('fs-extra');
const archiver = require('archiver');
const version = require('./package.json').version;


const homeDir = '/Users/thomasnatter/';


// check version numbering
const sysConfigVersion = require('./app/config/sysConfig.json').version

if (version !== sysConfigVersion) throw Error('sysConfig.version != package.version')


// delete existing MagicFlute_v_* in downloads folder if any

let ddir = fs.readdirSync(homeDir + "Downloads");
ddir
    .filter(x=>x.startsWith("MagicFlute"))
    .forEach(x=>{
        fs.removeSync(homeDir + 'Downloads/' + x);
    })

fs.removeSync(homeDir + 'Downloads/MagicFlute.zip');
fs.removeSync(homeDir + 'Downloads/MagicFlute');


// create a file to stream archive data to. 

var output = fs.createWriteStream(homeDir + `Downloads/MagicFlute_v_${version}.zip`);
var archive = archiver('zip', {
    store: false // set to true for no compression.
});

// listen for all archive data to be written 

output.on('close', function() {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
    console.log('MagicFlute.zip has been copied to the Downloads folder.');
});


archive.on('error', function(err) {
    throw err;
});

// pipe archive data to the file 

archive.pipe(output);


// add files and directories to the archive

archive.file('installMagicFlute', { name: 'installMagicFlute' });
archive.file('readme_first.txt', { name: 'README_FIRST.txt' });
archive.file(homeDir + 'Library/MagicFlute/papageno/pap_live', { name: '.pap_live' });
archive.directory('release/darwin-x64/MagicFlute-darwin-x64/MagicFlute.app', '.MagicFlute.app');
archive.directory(homeDir + 'Library/MagicFlute/defaultImg', '.img');

// finalize the archive (ie we are done appending files but streams have to finish yet)
archive.finalize();






