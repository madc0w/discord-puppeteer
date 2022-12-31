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

	const link = await findDiv(page, 'Continue in browser');
	await link.click();
	const bodyHtml = await page.evaluate(() => document.body.innerHTML);
	console.log(bodyHtml);
})();

function normalize(text) {
	text = text.replace(/\r\n|\r/g, '\n');
	text = text.replace(/\ +/g, ' ');

	// Replace &nbsp; with a space
	const nbspPattern = new RegExp(String.fromCharCode(160), 'g');
	return text.replace(nbspPattern, ' ');
}

async function findDiv(page, string) {
	const links = await page.$$('div');
	for (const link of links) {
		const text = await (await link.getProperty('innerText')).jsonValue();
		// console.log(text);
		// const linkText = await valueHandle.jsonValue();
		// const text = getText(linkText);
		if (string == text) {
			return link;
		}
	}
}
