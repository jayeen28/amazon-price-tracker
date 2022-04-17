const puppeteer = require('puppeteer');
require('dotenv').config();

const managePrice = async (page, browser) => {
    await page.reload({ waitUntil: ["networkidle0", "domcontentloaded", "networkidle2"] });
    const price = await page.evaluate(() => document.querySelectorAll("[data-a-color=price]")[0]?.innerText?.split('\n')[0]?.replace(/[^a-zA-Z0-9.]/g, ''));
    if (price) {
        if (price <= 160) {
            browser.close();
            process.exit(0);
        } else {
            console.log('still high');
        }
    }
    else {
        console.log('Price not found')
    }
};

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(process.env.TARGET_URL);
    await managePrice(page, browser);
    setInterval(async () => {
        await managePrice(page, browser);
    }, 20000)
})();