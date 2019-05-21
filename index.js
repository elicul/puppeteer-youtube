const puppeteer = require('puppeteer')
var fs  = require("fs")
try {
  (async () => {
    
    var songs = fs.readFileSync('songs-name.txt').toString().split('\n')
    const headless = process.argv[3] === 'true';
    const browser = await puppeteer.launch({
        headless: headless
    })
    const page = await browser.newPage()
    
    for (let index = 0; index < songs.length; index++) {
        const song = songs[index];
        await page.goto('https://youtube.com',  {waitUntil: 'networkidle2'})
        await page.type('#search', song)
        await page.waitForSelector('button#search-icon-legacy')
        await page.click('button#search-icon-legacy')
        await page.waitForSelector('a#video-title')
        const videos = await page.$$('#video-title')
        await videos[0].click()
        await page.waitForSelector('.html5-video-container')
        fs.appendFileSync('songs-url.txt', `${page.url()}\n`);
    }
    await browser.close()
  })()
} catch (err) {
  console.error(err)
}