const puppeteer = require('puppeteer');

async function crawlAndSave(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    // 페이지에서 JavaScript가 실행될 시간을 기다립니다.
    await page.waitForSelector('#cbox_module_wai_u_cbox_content_wrap_tabpanel'); // 댓글이 로드될 때까지 기다립니다.

    // 크롤링 결과를 저장할 객체
    let crawlingResults = {};

    // 제목과 부제목 크롤링 (선택자가 정확한지 확인 필요)
    const title = await page.$eval('#titleName_toolbar > strong', el => el.innerText);
    const subtitle = await page.$eval('#subTitle_toolbar', el => el.innerText);
    crawlingResults['title'] = title;
    crawlingResults['subtitle'] = subtitle;

    // 댓글 크롤링 (댓글 구조에 따라 수정이 필요할 수 있습니다.)
    let comments = await page.$$eval("#cbox_module_wai_u_cbox_content_wrap_tabpanel > ul > li > div > div > div:nth-child(2) > span:nth-child(2)", elements => elements.map(element => element.innerText));
    crawlingResults['comments'] = comments;

    console.log(JSON.stringify(crawlingResults, null, 4));
    
    await browser.close(); // 브라우저 종료
    return JSON.stringify(crawlingResults, null, 4);
}

module.exports = {crawlAndSave}