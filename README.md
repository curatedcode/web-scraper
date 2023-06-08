# Web scraper

This is a web scraper made for gathering product data from [walmart.com](walmart.com).

It scrapes product titles, prices, images, descriptions, and review ratings / bodies.

As many of these online marketplaces try to prevent bots from scraping their data by changing the layout and element attributes, it may not be functioning when you try to use it.

This was originally created to gather data for my e-commerce project [toshi](https://github.com/curatedcode/toshi).

### How To Deploy Project Locally

1. This project requires you to have Node.js installed, refer to [their website](https://nodejs.org/en/download/) on how to get it installed.

2. Clone this repo to your local machine with one of the commands below. You can also read the GitHub documentation on [cloning a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).

```
# If you have SSH set up with Git:
git clone git@github.com:curatedcode/web-scraper.git

# For HTTPS:
git clone https://github.com/curatedcode/web-scraper.git

# Finally, GitHub CLI:
gh repo clone curatedcode/web-scraper
```

3. `cd` into the directory of your local clone.

4. Install the required packages

```
pnpm install
```

5. Finally start the app

```
pnpm start
```
