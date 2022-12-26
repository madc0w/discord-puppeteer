const GOOGLE_CHROME_BIN =
	'C:/Program Files/Google/Chrome/Application/chrome.exe';
const puppeteer = require('puppeteer-extra');

(async () => {
	const browser = await puppeteer.launch({
		// headless: false,
		// args: ['--no-sandbox', '--disable-setuid-sandbox'],
		// args: [`--proxy-server=${proxyUrl}`],
		defaultViewport: {
			width: 1920,
			height: 1080,
		},
		executablePath: GOOGLE_CHROME_BIN,
	});
	const page = await browser.newPage();
	await page.goto('https://discord.com/channels/@me/995065159271850206', {
		waitUntil: 'networkidle2',
		timeout: 8000,
	});

	// const body = await page.$eval('body', (el) => el.innerText);
	// const bodyHtml = await page.evaluate(() => document.body.innerHTML);
	// console.log(bodyHtml);

	const link = await findDiv(page, 'Continue in browser');
	console.log(link);
})();

// Normalizing the text
function getText(linkText) {
	linkText = linkText.replace(/\r\n|\r/g, '\n');
	linkText = linkText.replace(/\ +/g, ' ');

	// Replace &nbsp; with a space
	const nbspPattern = new RegExp(String.fromCharCode(160), 'g');
	return linkText.replace(nbspPattern, ' ');
}

async function findDiv(page, string) {
	const links = await page.$$('div');
	for (let i = 0; i < links.length; i++) {
		const text = await links[i].getProperty('innerText');
		console.log(text);
		// const linkText = await valueHandle.jsonValue();
		// const text = getText(linkText);
		if (string == text) {
			console.log(string);
			console.log(text);
			console.log('Found');
			return links[i];
		}
	}
}
