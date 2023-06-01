import { Browser } from "puppeteer";

export declare type CrawlerProps = {
  name: string;
  browser: Browser;
  productUrls: string[];
};

export declare type Images = {
  url: string;
}[];

export declare type Reviews = {
  rating: number;
  title?: string | null;
  body?: string | null;
}[];

export declare type CrawlerReturnData = {
  title: string;
  price: Number;
  description: string;
  images: Images;
  reviews?: Reviews;
}[];
