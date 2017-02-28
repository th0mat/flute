// before running this test main needs to be rebuilt to ensure that
// electron changes userDir to ./mock/userdir
//
// npm run build-main-test


import path from 'path';
import chromedriver from 'chromedriver';
import webdriver from 'selenium-webdriver';
import {expect} from 'chai';
import electronPath from 'electron-prebuilt';
import {remote} from 'electron';


chromedriver.start(); // on port 9515
process.on('exit', chromedriver.stop);
const By = webdriver.By;


const delay = time => new Promise(resolve => setTimeout(resolve, time));

let driver;

describe('e2e tests', function spec() {
    this.timeout(5000);

    before(async() => {
        await delay(1000); // wait chromedriver start time
        driver = new webdriver.Builder()
            .usingServer('http://localhost:9515')
            .withCapabilities({
                chromeOptions: {
                    binary: electronPath,
                    args: [`app=${path.resolve()}`]
                }
            })
            .forBrowser('electron')
            .build();
    });

    after(async() => {
        // await driver.quit();
    });

    // const findCounter = () => this.driver.findElement(webdriver.By.className(counterStyles.counter));
    //
    // const findButtons = () => this.driver.findElements(webdriver.By.className(counterStyles.btn));

    describe('header, footer & title', function spec() {

        it('should open window with title', async() => {
            const title = await driver.getTitle();
            expect(title).to.be.equal('MagicFlute');
        });

        it('should have footer with text', async() => {
            const footer = await driver.findElements(By.className('flFooter'));
            const txt = await footer[0].getText();
            expect(txt).to.be.equal("i'm a tiny footer");
        });

        it('should have 8 button menu in header', async() => {
            const buttons = await driver.findElements(By.className('flHeader'))
                .then(x => Promise.resolve(x[0]))
                .then(x => x.findElements(By.className('pt-button')));
            expect(buttons.length).to.be.equal(8);
        });


    })

    describe('dashboard view', function spec() {

        it('should have the right h4', async() => {
            await delay(3000);
            const h4 = await driver.findElement(By.id("firstH4"))
                .then(x => x.getText());
            expect(h4).to.be.equal("Logging system status  ");
        })
    })
})