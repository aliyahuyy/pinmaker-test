const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser in non-headless mode
    const browser = await puppeteer.launch({ headless: false });
    
    // Open a new page
    const page = await browser.newPage();
    
    // Go to the website
    await page.goto('https://pinmarker-test.leonardhors.com/');

    await page.screenshot({path:'tester.png'});
    
    // Close the browser
    await browser.close();
})();