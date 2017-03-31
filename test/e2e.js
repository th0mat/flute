// before running this test main needs to be rebuilt to ensure that
// electron changes userDir to ./mock/userdir
//
// npm run build-main-test

import fs from 'fs-extra'
import path from 'path';
import moment from 'moment';
import {expect} from 'chai';
import electronPath from 'electron-prebuilt';
import {remote} from 'electron';
import {Application} from 'spectron';
import {logLoader, logPath} from './utils/logLoader';
import refreshMocks from './utils/refreshMocks';

let app;

function getApp(){
    app = new Application({
        path: electronPath,
        args: [path.resolve()],
        env: {
             // todo: not working - why?
        }
    })
    return app.start();
}


const delay = time => new Promise(resolve => setTimeout(resolve, time));


refreshMocks();




describe('e2e tests', function spec() {
    this.timeout(60 * 1000);

    // before(async() => {
    //     getApp();
    //     await delay(5000)
    // });

    after(async() => {
        // await app.stop();
    });


    describe('test tests', function spec() {

        it('winston.log in mocks dir exists', async() => {
            expect(fs.existsSync(logPath + "/winston.log")).to.be.ok;
        });

    });

    describe('header, footer & title', function spec() {

        it('open window with correct title', async() => {
            getApp();
            await delay(5000);

            const title = await app.client.getTitle();
            expect(title).to.be.equal('MagicFlute');
        });

        it('have footer with text', async() => {
            const footer = await app.client.$('.flFooter').getText();
            expect(footer).to.be.equal("i'm a tiny footer");
        });

        it('have 8 button menu in header', async() => {
            const buttons = await app.client.$$('.flHeader .pt-button')
            expect(buttons.length).to.be.equal(8);
        });


    });

    describe('dashboard view', function spec() {

        it('have the right h4', async() => {
            const h4 = await app.client.$("#firstH4").getText();
            expect(h4).to.be.equal("Logging system status");
        });

        it('have the right record count', async() => {
            const recs = await app.client.$("#noOfRecs").getText();
            expect(recs).to.be.equal("121,847");
        });

        it('have the right device number count', async() => {
            const recs = await app.client.$("#noOfDevs").getText();
            expect(recs).to.be.equal("4,046");
        });

        it('have email notification switch set correctly at start-up', async() => {
            const global = await app.electron.remote.getGlobal('sharedObj');
            const emailConfig = global.userConfig.autoOnEmailNotifications;
            const actual = await app.client.$('#emailNotify').getAttribute('label');
            expect(emailConfig).to.be.equal(actual.includes(' on'));
        });

        it('have system notification switch set correctly at start-up', async() => {
            const global = await app.electron.remote.getGlobal('sharedObj');
            const sysConfig = global.userConfig.autoOnSysNotifications;
            const actual = await app.client.$('#sysNotify').getAttribute('label');
            expect(sysConfig).to.be.equal(actual.includes(" on"));
        });

    });


    //
    // describe('mfuid handling', function spec() {
    //
    //     // mfuidFileHandler() is called from index
    //     // .mfuid file is created when none exists
    //     // .mfuid file contains username-tsInMilliSec string from time of first install
    //
    //     it('not create new .mfuid if exists', async() => {
    //         const mfuid = path.resolve('./mocks/userdir/.mfuid');
    //         let content = fs.readFileSync(mfuid, {encoding: 'utf-8'});
    //         let dec = new Buffer(content, 'base64').toString();
    //         expect(dec).to.be.equal('thomasnatter-1488261806608')
    //         await app.stop();
    //     });
    //
    //     it('create .mfuid if none is present', async() => {
    //         const mfuid = path.resolve('./mocks/userdir/.mfuid');
    //         if (fs.existsSync(mfuid)) fs.unlinkSync(mfuid);
    //         getApp();
    //         await delay(5000);
    //         expect(fs.existsSync(mfuid)).to.be.ok;
    //     });
    //
    //     it('register new .mfuid with flengine', async() => {
    //         const mfuid = path.resolve('./mocks/userdir/.mfuid');
    //         const logs = logLoader();
    //         expect(logs.findIndex(x=>x.includes("flengine response from /mfapi/mfuidreg: 200"))).not.equal(-1);
    //     });
    //
    //     it('mfuid is in the correct format', async() => {
    //         // correct format: username-timestampInMilliSecs
    //         // ts should be less than 1 min old, since it was just created in above test
    //         const mfuid = path.resolve('./mocks/userdir/.mfuid');
    //         let content = fs.readFileSync(mfuid, {encoding: 'utf-8'});
    //         let arr = new Buffer(content, 'base64').toString().split("-");
    //         expect(arr[0]).to.be.equal('thomasnatter');
    //         expect(moment().diff(moment(parseInt(arr[1])), 'seconds')).to.be.below(60);
    //     });
    // });
    //
    // describe('flengine msg handling', function spec(){
    //
    //     // fetchMozartMsg is called from index and then stored in appState.mozartMsg
    //
    //     it('received mozartMsg ', async()=>{
    //         const logs = logLoader();
    //         expect(logs.findIndex(x=>x.includes("flengine response from /mfapi/fetchMsg: 200"))).not.equal(-1);
    //
    //         // await app.stop();
    //     });
    // })

    describe('basic navigation', function spec(){


        it('liveMonitor', async()=>{
            const live = await app.client.$('#hm-monitor').click();
            const h3 = await app.client.$('#title').getText();
            expect(h3).to.be.equal("Live Monitor");
            // await app.stop();
        });

        it('scan for all devices', async()=>{
            const scan = await app.client.$('#hm-scan').click();
            //await app.client.waitUntilWindowLoaded(10000);
            const h3 = await app.client.$('#title').getText();
            expect(h3).to.be.equal("Scan for all devices");
            // await app.stop();
        });

        it('traffic history', async()=>{
            const history = await app.client.$('#hm-history').click();
            //await app.client.waitUntilWindowLoaded(10000);
            const h3 = await app.client.$('#title').getText();
            expect(h3).to.be.equal("Traffic History");
            // await app.stop();
        });

        it('activity logs', async()=>{
            const logs = await app.client.$('#hm-logs').click();
            //await app.client.waitUntilWindowLoaded(10000);
            const h3 = await app.client.$('#title').getText();
            expect(h3).to.be.equal("Activity Logs");
            // await app.stop();
        });














    })



})