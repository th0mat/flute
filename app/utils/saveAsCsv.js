import fs from 'fs';
const {dialog} = require('electron').remote;

const logger = require('electron').remote.getGlobal('sharedObj').logger;

export default function saveAsCSV(fileName, content){
    dialog.showSaveDialog({
        title: "MagicFlute",
    defaultPath: "~/Downloads/" + fileName
    }, (fileName)=>{
        if (fileName === undefined) return;
        fs.writeFile(fileName, content, (err)=>{
            if (err) {
                logger.error("*** error saving csv file: ", err);
                dialog.showErrorBor("File save error", err.message)
            }
            dialog.showMessageBox({
                message: "The file has been saved",
                buttons: ["OK"]
            });
        })

    })
}