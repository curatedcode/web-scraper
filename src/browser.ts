import puppeteer, { Browser, PuppeteerLaunchOptions } from "puppeteer";

const browserOptions: PuppeteerLaunchOptions = {
  headless: false,
  args: ["--disable-setuid-sandbox"],
  ignoreHTTPSErrors: true,
};

async function startBrowser(): Promise<Browser | undefined> {
  let browser;
  try {
    console.log("Starting browser instance...");
    browser = await puppeteer.launch(browserOptions);
  } catch (err) {
    console.log(`Unable to create browser instance: ${err}`);
  }
  return browser;
}

export { startBrowser };
