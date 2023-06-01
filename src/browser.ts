import { Browser, PuppeteerLaunchOptions } from "puppeteer";
import puppeteer from "puppeteer-extra";
import stealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(stealthPlugin());

const browserOptions: PuppeteerLaunchOptions = {
  headless: false,
  args: ["--disable-setuid-sandbox"],
  ignoreHTTPSErrors: true,
  defaultViewport: { height: 1080, width: 1920 },
  executablePath: "/usr/bin/google-chrome-stable",
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
