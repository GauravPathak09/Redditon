const { chromium } = require("playwright");


async function scrapeSubreddit(subreddit) {
const browser = await chromium.launch({
    headless: false
});
const page = await browser.newPage();
await page.goto("https://www.reddit.com");
  await page.waitForTimeout(10000);

    await browser.close();
}
(async () => {
    await scrapeSubreddit("programming");
})();