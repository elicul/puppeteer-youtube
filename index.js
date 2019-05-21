const puppeteer = require('puppeteer')
try {
  (async () => {
    const headless = process.argv[3] === 'true';
    const browser = await puppeteer.launch({
        headless: headless
    })
    const page = await browser.newPage()
    await page.goto('https://youtube.com',  {waitUntil: 'networkidle2'})
    await page.type('#search', 'Fleetwood Mac Dreams')
    await page.click('button#search-icon-legacy')
    await page.waitForSelector('a#video-title')
    const videos = await page.$$('#video-title')
    await videos[0].click()
    await page.waitForSelector('.html5-video-container')
    console.log(page.url())
    await browser.close()
  })()
} catch (err) {
  console.error(err)
}