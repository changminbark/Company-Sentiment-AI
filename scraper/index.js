import puppeteer from "puppeteer";
import fs from 'fs';

// NOTES
// Testing on Apple on news.google.com: https://news.google.com/search?q=apple&hl=en-ID&gl=ID&ceid=ID%3Aen

// Puppeteer is a promise-based API.

// Difference between const and function is that function can be declared anywhere and used anywhere while const has to be in chronological
// order (must be declared before being called).

// NEW CODE - MAKES IT MORE DYNAMIC/SOFT CODING
// OLD CODE - MIGHT NEED TO CHANGE



// MAIN method that retrieves titles and writes the JSON data into a file using fs (node module)
const getTitles = async (config) => {

    // Create a query string (NEW CODE)
    const queryString = config.queryVars ? makeQueryString(config.queryVars) : '';
    console.log('queryString:' + queryString)

    // Create a URL string (NEW CODE)
    const url = `https://news.google.com/search?${queryString}&q=${config.searchTerm}`
    console.log(`URL: ${url}`)


    // https://pptr.dev/ -> Look into arguments to make it more dynamic
    // Creating puppeteer browser instance (OLD CODE)
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });
    
    const page = await browser.newPage();

    await page.goto("https://news.google.com/search?q=apple&hl=en-ID&gl=ID&ceid=ID%3Aen", {
        waitUntil: "domcontentloaded",
    });


    // Scrapes the data from the website
    const data = await loadLatestTitles(page);


    // Outputs data into console
    console.log(data);
    // console.log(data.entries())


    // Writes JSON data into test.txt as string (CSV)
    fs.writeFile("test1.txt", JSON.stringify(data), function(err) {
        if (err) {
            console.log(err);
        }
    })
    
    await browser.close();
};


// TESTING MAIN FUNCTION (NEW CODE)
const testQueryConfig = {
    searchTerm: "Apple",
    queryVars: {
        hl:"en-US",
        gl:"US",
        ceid:"US:en"
    }
}

export const data = JSON.stringify(await getTitles(testQueryConfig));



// HELPER FUNCTIONS

// Create a query string (NEW CODE)
function makeQueryString(query) {
    return Object.keys(query).map(key => `${key}=${query[key]}`).join('&')
}

// Load titles of page (OLD CODE)
async function loadLatestTitles(page) {
    // Initialize/reset previous titles
    let titles = [];
    const result = [];

    // This part scrapes the headline group that has 3 headlines that fall under a category.
    let headlines = await page.$$(".NiLAwe.mi8Lec.jzZQmc.Oc0wGc.R7GTQ.keNKEd.j7vNaf");
    for (let i of headlines){
        titles.push(await i.$$(".DY5T1d.RZIKme"));
    }
    for (let j=0; j < titles.length; j++) {
        for (let k of titles[j]){
            result.push(await k.evaluate(x => x.textContent));
            }
    }

    // This part scrapes the individual headlines.
    titles = [];
    headlines = await page.$$(".NiLAwe.y6IFtc.R7GTQ.keNKEd.j7vNaf.nID9nc");
    for (let i of headlines){
        titles.push(await i.$(".ipQwMb.ekueJc.RD0gLb"));
    }
    for (let j of titles){
        result.push(await j.evaluate(x => x.textContent));
    }

    return result;
};

