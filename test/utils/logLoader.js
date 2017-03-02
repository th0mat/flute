/**
 * Created by thomasnatter on 3/2/17.
 */
import fs from 'fs-extra';
import path from 'path';

export const logPath = path.resolve("./mocks/userdir/logs/");

// returns [] of log entries since last start
// considers winston file rotation
export function logLoader() {
    let logs0, logs1;
    if (fs.existsSync(logPath + "/winston1.log")) {
        logs1 = fs.readFileSync(logPath + "/winston1.log", 'utf8').split('\n');
    }
    logs0 = fs.readFileSync(logPath + "/winston.log", 'utf8').split('\n');
    let logs = [...logs1, ...logs0].reverse();
    let lastStart = logs.findIndex(x => { return x.includes('starting MagicFlute') });
    return logs.slice(0, lastStart + 1).reverse();
}

