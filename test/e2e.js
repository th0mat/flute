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

let app;
let client;

refreshMocks();




describe('e2e tests', function spec() {
    this.timeout(60 * 1000);

    before(async() => {
        getApp();
        await delay(5000)
    });

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
        })

    });



    describe('mfuid handling', function spec() {

        // mfuidFileHandler() is called from index
        // .mfuid file is created when none exists
        // .mfuid file contains username-tsInMilliSec string from time of first install

        it('not create new .mfuid if exists', async() => {
            const mfuid = path.resolve('./mocks/userdir/.mfuid');
            let content = fs.readFileSync(mfuid, {encoding: 'utf-8'});
            let dec = new Buffer(content, 'base64').toString();
            expect(dec).to.be.equal('thomasnatter-1488261806608')
            await app.stop();
        });

        it('create .mfuid if none is present', async() => {
            const mfuid = path.resolve('./mocks/userdir/.mfuid');
            if (fs.existsSync(mfuid)) fs.unlinkSync(mfuid);
            getApp();
            await delay(15000);
            expect(fs.existsSync(mfuid)).to.be.ok;
        });

        it('register new .mfuid with flengine', async() => {
            const mfuid = path.resolve('./mocks/userdir/.mfuid');
            const logs = logLoader();
            expect(logs.findIndex(x=>x.includes("flengine response from /mfapi/mfuidreg: 200"))).not.equal(-1);
        });

        it('mfuid is in the correct format', async() => {
            // correct format: username-timestampInMilliSecs
            // ts should be less than 1 min old, since it was just created in above test
            const mfuid = path.resolve('./mocks/userdir/.mfuid');
            let content = fs.readFileSync(mfuid, {encoding: 'utf-8'});
            let arr = new Buffer(content, 'base64').toString().split("-");
            expect(arr[0]).to.be.equal('thomasnatter');
            expect(moment().diff(moment(parseInt(arr[1])), 'seconds')).to.be.below(60);
            await app.stop();
        });
    });

    describe('flengine msg handling', function spec(){

        // fetchMozartMsg is called from index

        it('should have logged response from ', async()=>{

        });




    })



})