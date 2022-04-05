const puppeteer = require('puppeteer');

const managePrice = async (page, browser) => {
    await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
    const price = await page.evaluate(() => document.getElementById('corePrice_desktop').childNodes[1].innerText.split('\n')[2].replace(/[^a-zA-Z0-9.]/g, ''));
    if (price <= 160) {
        browser.close();
        process.exit(0);
    } else {
        console.log('still high');
    }
};

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.amazon.com/Das-Keyboard-Ultimate-Cherry-Mechanical/dp/B00JKQSGWE/ref=sr_1_1?keywords=blank+keyboard&qid=1649049673&sprefix=%2Caps%2C325&sr=8-1');
    await managePrice(page, browser);
    setInterval(async () => {
        await managePrice(page, browser);
    }, 20000)
})();