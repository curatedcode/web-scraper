import { CrawlerProps, CrawlerReturnData, Images, Reviews } from "./types";
import { writeFile } from "fs/promises";

async function crawler({
  name,
  browser,
  productUrls,
}: CrawlerProps): Promise<void> {
  console.log(`Started scraping for ${name}...`);
  const page = await browser.newPage();

  await page.goto("https://www.walmart.com/", {
    waitUntil: "domcontentloaded",
  });

  const allProductData: CrawlerReturnData = [];

  for (const url of productUrls) {
    // slow down the crawler so its less likely to get flagged
    await new Promise((resolve) => setTimeout(resolve, 5_000));

    // navigate to product page
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("h1[itemprop='name']", { visible: true });

    // get product data
    const title = await page.$eval(
      "h1[itemprop='name']",
      (el) => el.textContent
    );
    const price = await page.$eval("span[itemprop='price']", (el) => {
      const priceTextArr = el.textContent?.split("$") as string[];
      const price = Number(priceTextArr[1]);
      return price;
    });
    const description = await page.$eval(
      "div.dangerous-html",
      (el) => el.textContent
    );

    // get product images
    const images: Images = [];

    const imageIndexes = await page.$eval(
      "div[data-testid='vertical-carousel-container']",
      (el) =>
        Array.from({ length: el.children.length })
          .fill(null)
          .map((_, i) => i + 1)
    );
    for (const imageIndex of imageIndexes) {
      await page.click(
        `div[data-testid='vertical-carousel-container'] > div:nth-child(${imageIndex})`
      );
      const url = await page.$eval(
        "div[data-testid='media-thumbnail'] > img",
        (el) => el.src
      );
      images.push({ url });
    }

    await page.evaluate(() => window.scrollTo({ top: 3000 }));
    // takes some time for walmart off screen data to load
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // if product has reviews, get them
    const reviews: Reviews = [];
    const hasReviews = await page.$eval("#item-review-section", (el) => {
      if (el.children.length > 3) return true;
      return false;
    });

    if (hasReviews) {
      const reviewsToGet = await page.$eval("ul", (el) =>
        Array.from({ length: el.children.length })
          .fill(null)
          .map((_, i) => i + 1)
      );

      for (const reviewIndex of reviewsToGet) {
        const rating = await page.$eval(
          `ul.cc-2.cg-4.mt0.pr3.pl0.pl1-m > li:nth-child(${reviewIndex}) > div > div > div > div > div > div > span:nth-child(2)`,
          (el) => {
            const allText = el.textContent?.split("out") as string[];
            const rating = Number(allText[0]);
            return rating;
          }
        );
        const title = await page.$eval(
          `ul.cc-2.cg-4.mt0.pr3.pl0.pl1-m > li:nth-child(${reviewIndex}) > div > div > div > div:nth-child(2) > div`,
          (el) => el.textContent
        );
        const body = await page.$eval(
          `ul.cc-2.cg-4.mt0.pr3.pl0.pl1-m > li:nth-child(${reviewIndex}) > div > div > div > div:nth-child(2) > span`,
          (el) => el.textContent
        );
        reviews.push({ rating, title, body });
      }
    }

    allProductData.push({
      title: title ?? "",
      price: price,
      description: description ?? "",
      images,
      reviews,
    });
  }

  browser.close();

  await writeFile(`output/${name}.json`, JSON.stringify(allProductData));
}

export default crawler;