/**
 * Created by thomasnatter on 10/8/16.
 */
// download http://standards.ieee.org/develop/regauth/oui/oui.txt
// grep 'base 16' download.txt > oui.txt


import fs from 'fs';

var raw = fs.readFileSync('oui.txt');
raw = raw.toString().split('\n');

var oui = {};

for (let i = 0; i < raw.length; i++) {
    let mac = raw[i].substr(0, 6).toLowerCase();
    let desc = raw[i].substr(22).trim();
    if (!mac=="") oui[mac] = desc;
}

fs.writeFileSync('oui.json', JSON.stringify(oui, null, 4))

console.log('*** completed writing oui.json');


