import puppeteer from "puppeteer";

const titles = [];

// Testing on Apple on news.google.com: https://news.google.com/search?q=apple&hl=en-ID&gl=ID&ceid=ID%3Aen
// Puppeteer is a promise-based API.

const getTitles = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });
    
    const page = await browser.newPage();

    await page.goto("https://news.google.com/search?q=apple&hl=en-ID&gl=ID&ceid=ID%3Aen", {
        waitUntil: "domcontentloaded",
    });

    console.log(await loadLatestTitles(page));

    // TESTING QUERY SELECTOR FOR ONE ELEMENT (PLS IGNORE)
    // const headline = await page.evaluate(() => {
    //     // Fetch the first element with class "quote"
    //     const quote = document.querySelector(".NiLAwe.mi8Lec.jzZQmc.Oc0wGc.R7GTQ.keNKEd.j7vNaf");
    
    //     // Fetch the sub-elements from the previously fetched quote element
    //     // Get the displayed text and return it (`.innerText`)
    //     const text = quote.querySelector(".DY5T1d.RZIKme").innerText;
    
    //     return text;
    //   });
    
    // console.log(headline);
    
    await browser.close();
};

getTitles();


// Difference between const and function is that function can be declared anywhere and used anywhere while const has to be in chronological
// order (must be declared before being called).
async function loadLatestTitles(page) {
    // Reset previous titles
    // const titles = [];


    const headline = await page.$(".NiLAwe.mi8Lec.jzZQmc.Oc0wGc.R7GTQ.keNKEd.j7vNaf");
    const title = await headline.$(".DY5T1d.RZIKme");
    // Evaluates the handle element into the text content.
    const text = await title.evaluate(x => x.textContent);
    // const recentHeadNews = await page.$$("ipQwMb ekueJc RD0gLb");
    // const recentHeadlines = await recentHeadNews.$$(".hT8rr");

    return text;


}