const puppeteer = require('puppeteer');
const { add_firestore } = require('../audit/firebase/command')

puppeteer.launch({ headless: false }).then(async (browser) => {    // Launch the browser in non-headless mode
    try {    
        const date = new Date()
        const evidenceName = `TC-000-Step 1-Test Data on ${date}.png`

        // Open a new page
        const page = await browser.newPage();
        
        // Go to the website
        await page.goto('https://pinmarker-test.leonardhors.com/');

        await page.screenshot({path:'tester.png'});

        // Audit
        let data = {
            pic: 'Leonardho R Sitanggang',
            tc_id: 'TC-000',
            tc_name: 'Test name',
            tc_desc: 'Validate test',
            tc_evidence_name: evidenceName,
            tested_at: date,
        };
        await add_firestore(data, 'test_audit_pinmarker')
        
        // Close the browser
        await browser.close();
    } catch (error) {
        console.error('Error occurred:', error.message)
    } finally {
        await browser.close()
    }
}).catch((error) => {
console.error('Failed to launch browser:', error)
});