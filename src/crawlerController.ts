import { Browser } from "puppeteer";
import crawler from "./crawler";
import {
  automotiveUrls,
  babyUrls,
  beautyUrls,
  bookUrls,
  clothingUrls,
  computersUrls,
  electronicsUrls,
  gamesUrls,
  gardenUrls,
  healthUrls,
  homeUrls,
  jewelryUrls,
  kidsUrls,
  movieUrls,
  musicUrls,
  outdoorUrls,
  sportUrls,
  toolsUrls,
} from "./productUrls";

async function crawlerController(
  browserInstance: Promise<Browser | undefined>
) {
  const browser = await browserInstance;
  if (!browser) throw new Error("Browser instance is undefined");

  try {
    await crawler({
      name: "books",
      browser,
      productUrls: bookUrls,
    });
    await crawler({
      name: "movies",
      browser,
      productUrls: movieUrls,
    });
    await crawler({
      name: "music",
      browser,
      productUrls: musicUrls,
    });
    await crawler({
      name: "beauty",
      browser,
      productUrls: beautyUrls,
    });
    await crawler({
      name: "sports",
      browser,
      productUrls: sportUrls,
    });
    await crawler({
      name: "jewelry",
      browser,
      productUrls: jewelryUrls,
    });
    await crawler({
      name: "home",
      browser,
      productUrls: homeUrls,
    });
    await crawler({
      name: "electronics",
      browser,
      productUrls: electronicsUrls,
    });
    await crawler({
      name: "computers",
      browser,
      productUrls: computersUrls,
    });
    await crawler({
      name: "kids",
      browser,
      productUrls: kidsUrls,
    });
    await crawler({
      name: "babies",
      browser,
      productUrls: babyUrls,
    });
    await crawler({
      name: "automotive",
      browser,
      productUrls: automotiveUrls,
    });
    await crawler({
      name: "clothing",
      browser,
      productUrls: clothingUrls,
    });
    await crawler({
      name: "garden",
      browser,
      productUrls: gardenUrls,
    });
    await crawler({
      name: "outdoors",
      browser,
      productUrls: outdoorUrls,
    });
    await crawler({
      name: "games",
      browser,
      productUrls: gamesUrls,
    });
    await crawler({
      name: "health",
      browser,
      productUrls: healthUrls,
    });
    await crawler({
      name: "tools",
      browser,
      productUrls: toolsUrls,
    });
    console.log("Done crawling all pages");
  } catch (err) {
    console.log(`Error scraping data: ${err}`);
  }
}

export default crawlerController;
