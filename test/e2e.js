// before running this test main needs to be rebuilt to ensure that
// electron changes userDir to ./mock/userdir
//
// npm run build-main-test


import path from 'path';
import {expect} from 'chai';
import electronPath from 'electron-prebuilt';
import {remote} from 'electron';
import {Application} from 'spectron';


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

describe('e2e tests', function spec() {
    this.timeout(10000);

    before(async() => {
        getApp();
        await delay(5000)
        app.mainProcess.env().then(function (env) { console.log("*** env:", env)});
    });

    after(async() => {
        // await app.stop();
    });


    describe('header, footer & title', function spec() {

        it('should open window with title', async() => {
            const title = await app.client.getTitle();
            expect(title).to.be.equal('MagicFlute');
        });

        it('should have footer with text', async() => {
            const footer = await app.client.$('.flFooter').getText();
            expect(footer).to.be.equal("i'm a tiny footer");
        });

        it('should have 8 button menu in header', async() => {
            const buttons = await app.client.$$('.flHeader .pt-button')
            expect(buttons.length).to.be.equal(8);
        });


    });

    describe('dashboard view', function spec() {

        it('should have the right h4', async() => {
            const h4 = await app.client.$("#firstH4").getText();
            expect(h4).to.be.equal("Logging system status");
            //await app.stop();
        })

    });



    describe('communication with flengine', function spec() {

        it('should register mfuid if none is present', async() => {
        });

        it('should not register mfuid if already registered', async()=>{

        });

        it('should display update msg if one is received', async()=>{

        });

        it('should not display update msg if none is received', async()=>{

        });


    });

})