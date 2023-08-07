# Company-Sentiment-AI

This is a personal project that (may periodically) scrape and parse data about a certain company from a certain website 
like Google News and then uses an AI (NLP) or classification model to determine the overall sentiment/portrayal of the 
company in the news. This project will be divided into two parts.

The first part will be the scraping/parsing component.

The second part will be the analysis component.

## First Part (Scraper/Parser)

If the website I am scraping (such as Google News) requires a lot of JavaScript to function, then I will use NodeJS
and Puppeteer to parse/scrape the site. If the website doesn't require JS, then Beautiful Soup and Pandas.

For the automated function (if I am to implement it), I will use Cron.

## Second Part (Analyzer)

I will test whether a classification model (like SVC, KNearestNeighbors, DecisionTree, RandomForest, etc.)or an AI 
model (like an NLP, Deep Learning Neural Network, etc.).