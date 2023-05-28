import { Browser } from "puppeteer";
import bookCrawler from "./crawlers/book";

async function scrapeAll(browserInstance: Promise<Browser | undefined>) {
  const browser = await browserInstance;

  if (!browser) throw new Error("Browser instance is undefined");
  try {
    bookCrawler.run(browser);
  } catch (err) {
    console.log(`Error scraping data: ${err}`);
  }
}

export default scrapeAll;
