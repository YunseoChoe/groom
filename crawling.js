const {Builder, By, Key, until} = require('selenium-webdriver');
const fs = require('fs');

async function crawlAndSave(url) {
    let driver = await new Builder().forBrowser('chrome').build();
    
    try {
        await driver.get(url);
        await driver.sleep(5000); // 페이지 로딩 대기
        
        await driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");
        await driver.sleep(5000); // 스크롤 이후 추가 로딩 대기
        
        // 크롤링 결과를 저장할 객체
        let crawlingResults = {};
        
        // 제목과 부제목 크롤링
        let title = await driver.findElement(By.css('#titleName_toolbar > strong')).getText();
        let subtitle = await driver.findElement(By.css('#subTitle_toolbar')).getText();
        crawlingResults['title'] = title;
        crawlingResults['subtitle'] = subtitle;
        
        // 댓글 크롤링
        let comments = [];
        let parentElement = await driver.findElement(By.css("#cbox_module_wai_u_cbox_content_wrap_tabpanel > ul"));
        let childElements = await parentElement.findElements(By.xpath("./li/div[1]/div/div[2]/span[2]"));
        for (let element of childElements) {
            let comment = await element.getText();
            comments.push(comment);
        }
        crawlingResults['comments'] = comments;
        
        // 결과를 JSON 파일로 저장
        // fs.writeFile('results.json', JSON.stringify(crawlingResults, null, 4), 'utf8', (err) => {
        //     if (err) throw err;
        //     console.log('The file has been saved!');
        // });
        console.log(JSON.stringify(crawlingResults, null, 4));
        return JSON.stringify(crawlingResults, null, 4);
    } finally {
        await driver.quit();
    }
}

// let url = "https://comic.naver.com/webtoon/detail?titleId=648419&no=426&week=mon";
// crawlAndSave(url);

module.exports = {crawlAndSave}