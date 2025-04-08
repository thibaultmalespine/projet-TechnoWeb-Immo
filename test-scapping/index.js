import puppeteer from 'puppeteer-extra';
import cookies from "./cookies.js";

// add stealth plugin and use defaults (all evasion techniques)
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());


async function scrapping() {

    
    // Launch the browser.
    const browser = await puppeteer.launch();
    
    await browser.setCookie(...cookies);
    // Create a page.
    const page = await browser.newPage();
    
    // Va sur la page de l'annonce
    await page.goto("https://www.leboncoin.fr/ad/ventes_immobilieres/2801005799");
  

    try {
        await page.waitForSelector("button.mt-lg.text-body-1-link.font-semi-bold.underline");
        await page.click('button.mt-lg.text-body-1-link.font-semi-bold.underline'); // Sélectionner le bouton avec le texte "Voir plus" et le cliquer
    } catch (error) {
        console.log("problème lors du clique sur le bouton plus d'informations");
        
    }
    
    // Récupération des informations
    const [title, description, propriétés, adresse] = await Promise.all([
        page.$eval("h1", element => element.textContent),
        page.$eval("p.whitespace-pre-line.text-body-1", el => el.textContent.trim()),
        page.$$eval("[data-qa-id='criteria_container'] > div > div", divs => divs
            .filter(div => 
                div.textContent.includes("Type de bien") || 
                div.textContent.includes("Surface habitable") || 
                div.textContent.includes("Surface totale du terrain")
            )
            .map(div => div.querySelector("div").querySelector("div").querySelector("p").textContent)),
        page.$eval("p.inline-flex.w-full.flex-wrap.mb-md a", el => el.textContent.trim())
    ]);
    
    // Close browser.
    await browser.close();

    return {
        "Type de bien" : propriétés[0],
        "Surface" : parseInt(propriétés[1].split(" ")[0]),
        "Terrain" : propriétés[2] ? parseInt(propriétés[2]) : 0,
        "Titre" : title,
        "Description" : description,
        "Ville" : adresse.split(" ")[0],
        "Code postal" : adresse.split(" ")[1],
    }
}

let promise = scrapping();
promise.then((result) => {
    console.log(result);
    return
})
