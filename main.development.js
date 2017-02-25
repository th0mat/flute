import {app, BrowserWindow, ipcMain, Menu, shell, dialog} from 'electron';
import child_process from 'child_process';
import winston from 'winston';
import fs from 'fs';
import moment from 'moment';


//// build global object

// process.env.USER does not work in production
process.getUserName = function () {
    var username = require('child_process').execSync("whoami", {encoding: 'utf8', timeout: 1000});
    return String(username).trim();
}

global.sharedObj = {
    appDir: __dirname + '/app/',
    userDir: '/Users/' + process.getUserName() + '/Library/MagicFlute/',  // MacOS: account name and
                                                                          // the name of the home folder must match
    userConfig: null,
    sysConfig: null,
    mfuid: "not set yet",
    configReset: false
};


//// verify that userDir has been created and that the logging system has the
//// required permissions

// check if MagiFlute directory exists
const userDir = global.sharedObj.userDir;
if (!fs.existsSync(userDir)) {
    dialog.showErrorBox("MagicFlute", "It appears MagicFlute has not been installed correctly (user dir not found). " +
        "Please run installMagicFlute first.");
    app.quit();
}

// check that Papageno is installed with root as owner and setuid permission
try {
    const pap = child_process.execSync(`find ${userDir + 'papageno'} -perm +4000 -user root`,
        {encoding: 'utf8', timeout: 1000});
    if (pap.includes('pap_live') && pap.includes('pap_log')) {
        // looking good
    } else {
        throw new Error('logSys not installed correctly');
    }
    ;
} catch (e) {
    dialog.showErrorBox("MagicFlute", "It appears MagicFlute has not been installed correctly. The logging system " +
        "is missing or does not have the required permissions. " +
        "Please run installMagicFlute first.");
    app.quit();
}


//// set up logger [[not in module, because userDir would not be set at time of import]]
//// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

const tsFormat = function () {
    return moment().format('YYYY-MM-DD HH:mm:ss');
}
const logDir = global.sharedObj.userDir + 'logs';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
const logger = new (winston.Logger)({
    transports: [
        // colorize the output to the console
        new (winston.transports.Console)({
            timestamp: tsFormat,
            colorize: true,
            level: 'silly'
        }),
        new (winston.transports.File)({
            filename: `${logDir}/winston.log`,
            timestamp: tsFormat,
            json: false,
            maxFiles: 3,
            maxsize: 200000,
            tailable: true,
            level: 'silly',
            handleExceptions: true,
            humanReadableUnhandledException: true
        })
    ]
});

global.sharedObj.logger = logger;
logger.info("------------------------------------------");
logger.info("*** starting MagicFlute");

//// configure process

if (process.env.NODE_ENV === 'development') {
    require('electron-debug')(); // eslint-disable-line global-require
}

process.on('warning', (w)=>{
    logger.warn(`*** main process warning: ${w.name} - ${w.message}`);
})

process.on('uncaughtException', function (e) {
    logger.error("*** uncaught exception: ", e)
})

// rss - resident set size: code segment + stack + heap
setInterval(()=>{
    let m = process.memoryUsage();
    logger.info(`*** main memory usage - rss: ${m.rss}, heapUsed: ${m.heapUsed}`)
}, 1000 * 3600)


//// load sysConfig and userConfig
try {
    global.sharedObj.sysConfig = JSON.parse(fs.readFileSync(`${__dirname}/app/config/sysConfig.json`, 'utf8'));
} catch (e) {
    logger.error("*** error loading config.sys ", e);
    //todo: rm below path
    dialog.showErrorBox("MagicFlute", `Reading of system config ${__dirname + '/app/config/sysConfig.json'} failed. Try to reinstall MagicFlute ` +
        "with installMagicFlute.");
    app.quit();
}

try {
    global.sharedObj.userConfig = JSON.parse(fs.readFileSync(`${global.sharedObj.userDir}userConfig.json`, 'utf8'));
} catch (e) {
    global.sharedObj.userConfig = global.sharedObj.sysConfig.defaultUserConfig;
    global.sharedObj.configReset = true;
    logger.warn("*** userConfig was reset to default config due to error:", e.code);
    try {
        fs.writeFileSync(`${global.sharedObj.userDir}userConfig.json`,
            JSON.stringify(global.sharedObj.userConfig, null, 4));

    } catch (err) {
        logger.error("*** error storing default user config: ", err.code);
        dialog.showErrorBox("MagicFlute", "Reading of user config and storing of default user config failed");
        app.quit();
    }
}


//// configure app

let mainWindow = null;
let menu;
let template;

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});


app.on('before-quit', () => {
    logger.info("*** cleaning up...");
    logger.info("*** onQuitStay: ", global.sharedObj.userConfig.onQuitStay)
    if (!global.sharedObj.userConfig.onQuitStay) {
        turnLogSysOff();
    } else {
        logger.info("*** logSysStatus was not changed");
    }
});

app.on('window-all-closed', function(){
    logger.warn("*** window-all-closed event triggered");
    app.quit();
});


app.on('ready', async() => {
//    await loadUserConfig();
    await installExtensions();
    let userConfig = global.sharedObj.userConfig;

    mainWindow = new BrowserWindow({
        show: false,
        width: userConfig.windowParams.width || 500,
        height: userConfig.windowParams.height || 800,
        x: userConfig.windowParams.x || 100,
        y: userConfig.windowParams.y || 100
    });



    logger.info("*** loadURL: " + `file://${__dirname}/app/app.html`);
    mainWindow.loadURL(`file://${__dirname}/app/app.html`);

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.show();
        mainWindow.focus();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.webContents.on('crashed', function (e) {
        logger.error("*** mainWindow crash: ", e);
    });

    mainWindow.on('unresponsive', function (e) {
        logger.error("*** mainWindow unresponsive event triggered: ", e);
    });


    if (process.env.NODE_ENV === 'development') {
        mainWindow.openDevTools();
        mainWindow.webContents.on('context-menu', (e, props) => {
            const {x, y} = props;

            Menu.buildFromTemplate([{
                label: 'Inspect element',
                click() {
                    mainWindow.inspectElement(x, y);
                }
            }]).popup(mainWindow);
        });
    }

    if (process.platform === 'darwin') {
        template = [{
            label: 'MagicFlute',
            submenu: [{
                label: 'About MagicFlute',
                selector: 'orderFrontStandardAboutPanel:'
            }, {
                label: 'Quit',
                accelerator: 'Command+Q',
                click() {
                    app.quit();
                }
            }]
        },
            {
                label: "Edit",
                submenu: [
                    {label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:"},
                    {label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:"},
                    {type: "separator"},
                    {label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:"},
                    {label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:"},
                    {label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:"},
                    {label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:"}
                ]
            },

            {
                label: 'Help',
                submenu: [{
                    label: 'Learn More',
                    click() {
                        shell.openExternal('https://www.packetmozart.com');
                    }
                }]
            }];

        menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
    } else {
        template = [{
            label: '&File',
            submenu: [{
                label: '&Open',
                accelerator: 'Ctrl+O'
            }, {
                label: '&Close',
                accelerator: 'Ctrl+W',
                click() {
                    mainWindow.close();
                }
            }]
        }, {
            label: '&View',
            submenu: (process.env.NODE_ENV === 'development') ? [{
                    label: '&Reload',
                    accelerator: 'Ctrl+R',
                    click() {
                        mainWindow.webContents.reload();
                    }
                }, {
                    label: 'Toggle &Full Screen',
                    accelerator: 'F11',
                    click() {
                        mainWindow.setFullScreen(!mainWindow.isFullScreen());
                    }
                }, {
                    label: 'Toggle &Developer Tools',
                    accelerator: 'Alt+Ctrl+I',
                    click() {
                        mainWindow.toggleDevTools();
                    }
                }] : [{
                    label: 'Toggle &Full Screen',
                    accelerator: 'F11',
                    click() {
                        mainWindow.setFullScreen(!mainWindow.isFullScreen());
                    }
                }]
        }, {
            label: 'Help',
            submenu: [{
                label: 'Learn More',
                click() {
                    shell.openExternal('http://electron.atom.io');
                }
            }, {
                label: 'Documentation',
                click() {
                    shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
                }
            }, {
                label: 'Community Discussions',
                click() {
                    shell.openExternal('https://discuss.atom.io/c/electron');
                }
            }, {
                label: 'Search Issues',
                click() {
                    shell.openExternal('https://github.com/atom/electron/issues');
                }
            }]
        }];
        menu = Menu.buildFromTemplate(template);
        mainWindow.setMenu(menu);
    }
    // mainWindow.webContents.on('did-finish-load', () => {
    //     mainWindow.webContents.send('dirs', {appDir: __dirname + '/', userDir: __dirname + '/app/user/'});
    // })
});


//// install dev tools

const installExtensions = async() => {
    if (process.env.NODE_ENV === 'development') {
        const installer = require('electron-devtools-installer'); // eslint-disable-line global-require

        const extensions = [
            'REACT_DEVELOPER_TOOLS',
            'REDUX_DEVTOOLS'
        ];
        const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
        for (const name of extensions) {
            try {
                await installer.default(installer[name], forceDownload);
            } catch (e) {
            } // eslint-disable-line
        }
    }
};


//// utility to shut down traffic logging system at electron shut down if
//// so configured


function turnLogSysOff() {
    let pid;
    try {
        const pidRaw = child_process.execSync(`pgrep pap_log`);
        const pidString = pidRaw.toString("utf-8").trim();
        pid = parseInt(pidString);
    } catch (e) {
        logger.error("*** problem turning off logSystem: ", e);
        return 0;
    }
    if (pid) {
        child_process.exec("kill " + pid);
        logger.info("*** killed logSys pid: ", pid)
    }
}



