const { test, expect } = require('@playwright/test');

test('Browser Context Playwright Test', async ({ browser }) => {
	// Create a new incognito browser context (to inject plugins, cookies, etc)
	const context = await browser.newContext();
	const page = await context.newPage();
	await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

	const userName = page.locator('input#username');
	const password = page.locator('[type="password"]');
	const signInButton = page.locator('#signInBtn');

	await userName.type('rahulshetty');
	await password.type('learning');
	await signInButton.click();

	const alertLocator = await page.locator('[style*="block"]');
	await expect(alertLocator).toContainText('Incorrect username/password.');
	// console.log('Error Message: ', await alertLocator.textContent());

	await userName.fill('');
	await userName.type('rahulshettyacademy');
	await signInButton.click();

	await page.waitForURL('**/angularpractice/shop');
	const productTitles = page.locator('.card-body a');
	const allTitles = await productTitles.allTextContents();
	console.log(allTitles);
});

test('Page Fixture Playwright Test', async ({ page }) => {
	await page.goto('https://www.saucedemo.com/');
	await expect(page).toHaveTitle('Swag Labs');
	// console.log('Page Title: ', await page.title());

	await page.locator('[name="user-name"]').type('test_user');
	await page.locator('[name="password"]').type('secret_sauce');
	await page.locator('[value="Login"]').click();

	const alertLocator = await page.locator('.error-message-container > h3');
	await expect(alertLocator).toContainText(
		'Epic sadface: Username and password do not match any user in this service'
	);
});

test('The user is able to see a list of products upon successful login.', async ({ page }) => {
	await page.goto('https://rahulshettyacademy.com/client/');

	const userName = page.locator('[type="email"]');
	const password = page.locator('[type="password"]');
	const loginButton = page.locator('[value="Login"]');

	await userName.type('standard.user@example.com');
	await password.type('Pass@123');
	await loginButton.click();

	await page.waitForLoadState('networkidle');
	const productTitles = page.locator('.card-body b');
	const allTitles = await productTitles.allTextContents();
	console.log(allTitles);
});
