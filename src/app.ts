import express from "express";
const app = express();
const port = 3003;

import { startBrowser } from "./browser";
import crawlerController from "./crawlerController";

app.get("/", (req, res) => {
  res.send("alive");
});

app.listen(port, () => console.log(`Server started on port ${port}`));

const browserInstance = startBrowser();
crawlerController(browserInstance);
