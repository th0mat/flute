import moment from 'moment';
import {store} from '../index';
import {remote} from 'electron';
import postJson from './postJson';
import {internetAvailable} from './connectionHandling';
const logger = remote.getGlobal('sharedObj').logger;


export async function sendMail(subject, bodyText) {

    const pending = store.getState().appState.pendingMail;
    let mail = {
        address: store.getState().appState.userConfig.notificationEmailAddress,
        subject: subject,
        message: bodyText,
        version: remote.getGlobal('sharedObj').sysConfig.version,
        mfuid: remote.getGlobal('sharedObj').mfuid,
        ts: Math.floor((+new Date())/1000)
    };

    if (await internetAvailable()) {
        postJson('/mfapi/notify', mail)
            .then(resp => logger.info("*** mail sent, server response: ", resp))
            .catch(err => {
                pending.push(mail);
                logger.warn(`*** added email to ${mail.address} to pending mail: ${err}`)
                });
    } else {
        logger.info(`*** added email to ${mail.address} to pending mail: no internet`)
        pending.push(mail);
        store.dispatch({type: 'UPDATE_PENDING_MAIL', payload: pending})
    }
}


export function sendPendingMail(){
    const pending = store.getState().appState.pendingMail;
    if (pending.length === 0) return;
    const subject = 'Delayed MagicFlute notifications';
    let newBodyText = 'The below messages have been pending, because no internet connection was ' +
        'available at the time the messages were created. \n\n';

    pending.forEach(x => {
        newBodyText += x.subject + ` (${moment.unix(x.ts).format("MMM D, h:mm a")})\n\n`;
        newBodyText += x.message + '\n\n------------------\n\n';
    });
    store.dispatch({type: 'UPDATE_PENDING_MAIL', payload: []});
    sendMail(subject, newBodyText)
        .catch(err => {
            logger.error(`*** sendMail promise from sendPendingMail rejected: ${err}`);
        });
}