import { Browser } from "puppeteer";

async function crawlerController(
  browserInstance: Promise<Browser | undefined>
) {
  const browser = await browserInstance;
  if (!browser) throw new Error("Browser instance is undefined");

  try {
    console.log("Done crawling all pages");
  } catch (err) {
    console.log(`Error scraping data: ${err}`);
  }
}

export default crawlerController;
