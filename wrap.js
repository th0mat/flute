// archiver.js creates a zip file for users to download and install
// MagicFlute
//
// MagicFlute.zip is copied into the Downloads folder. Any existing versions are
// deleted first.


var fs = require('fs-extra');
var archiver = require('archiver');

const homeDir = '/Users/thomasnatter/';


// delete existing MagicFlute.zip in downloads folder if any

fs.removeSync(homeDir + 'Downloads/MagicFlute.zip');
fs.removeSync(homeDir + 'Downloads/MagicFlute');



// create a file to stream archive data to. 

var output = fs.createWriteStream(homeDir + 'Downloads/MagicFlute.zip');
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




const README = `MagicFlute Installation

SUMMARY

1. Install MagicFlute by double-clicking on installMagicFlute.
2. Run MagicFlute - you find the icon to start on your Desktop or in your Apps folder.

After the installation the downloaded zip file and the folder it created can be
deleted.

--------------------------


WHAT THE INSTALLER DOES

The installer goes through the following steps 

1. It copies the MagicFlute app into the app folder.
2. It enables wifi-capture by changing the permission of the included logging program.
3. It creates a directory at ~/Library/MagicFlute to store data and settings.
4. It does not overwrite existing traffic data and config settings.

During the installation you might be asked for the admin password. Unfortunately this
is required by the operating system to enable wifi monitoring. The good news is,
that this is only required during the installation.

--------------------------


HOW TO UNINSTALL MagicFlute

1. delete MagicFlute in the app folder (application)
2. delete ~/Library/MagicFlute (data and config settings)

done :-)



`



// add files and directories to the archive

archive.file('installMagicFlute', { name: 'installMagicFlute' });
archive.file(homeDir + 'Library/MagicFlute/papageno/pap_live', { name: '.pap_live' });
archive.file(homeDir + 'Library/MagicFlute/papageno/pap_log', { name: '.pap_log' });
archive.directory('release/mac/ElectronReact.app', '.MagicFlute.app');
archive.directory(homeDir + 'Library/MagicFlute/defaultImg', '.img');
archive.append(README, { name: 'README.txt' });

// finalize the archive (ie we are done appending files but streams have to finish yet)
archive.finalize();






