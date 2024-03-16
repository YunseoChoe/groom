const express = require('express');
const app = express();
const port = 8000; 
const crawlControll = require("./crawling.js");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 크롤링 API
app.post('/crawl', async (req, res) => { // 순차적으로 진행
    // JSON 파일을 읽어서 클라이언트에게 응답
    // fs.readFile('results.json', 'utf8', (err, data) => {
    //     if (err) {
    //         console.error(err);
    //         res.status(500).send('Internal Server Error');
    //         return;
    //     }
    //     // JSON 형식으로 데이터 전송
    //     res.json(JSON.parse(data));
    // });
    const url = req.body.url;
    const crawlJson = await crawlControll.crawlAndSave(url);
    console.log(crawlJson);
    return res.json({mes : crawlJson});
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}!`);
});