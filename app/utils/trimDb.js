import moment from 'moment';
import {remote} from 'electron';

const logger = remote.getGlobal('sharedObj').logger;

// trim the db tables by deleting all records with time stamps before
// 00:00 of today - days; in case of days == 0 => delete all records

export default function trimDb(days) {
    let errf = (err)=> {
        if (err) {
            logger.error("*** db trim error: ", err);
        }
    };

    if (typeof days !== 'number' ) {
        logger.error("*** error: trimDb parameter is not a number");
        return;
    }
    const sqlite3 = require('sqlite3').verbose();
    const userDir = remote.getGlobal('sharedObj').userDir;
    const db = new sqlite3.Database(userDir + 'papageno/papageno.db', (err)=>{
        if (err) {
            logger.error("*** error opening db from trimDb: ", err);
            logger.error("*** trimDb path: ", this.props.userDir + 'papageno/papageno.db');
            alert("trimDb: " + err.stack);
            db.close();
        }
    });
    if (days === 0) {
        // delete all
        db.exec('DELETE FROM traffic', errf)
            .exec('DELETE FROM sysup', errf)
            .exec('VACUUM', errf)
            .close();
        logger.warn("*** db has been reset");
        return;
    }
    // delete before ts
    let tsCut = moment().hours(0).minutes(0).seconds(0).unix() // today
        - days * 24 * 3600; // full retention days

    db
        .exec(`DELETE FROM traffic WHERE ts < ${tsCut}`, errf)
        .exec(`DELETE FROM sysup WHERE ts < ${tsCut}`, errf)
        .exec('VACUUM', errf)
        .close();
    logger.info(`*** db trimmed to ${days} days`);
}