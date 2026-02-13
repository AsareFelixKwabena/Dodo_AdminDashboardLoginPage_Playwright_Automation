const {test, expect} = require('@playwright/test');


test.beforeEach('Navigate to Dodo Admin',async ({ page }) => {
    await page.goto('https://admin.usedodo.com/');
    console.log(await page.title())
});

test('Dodo Technology Admin Login Page should display correctly', async ({ page }) => {
    await page.goto('https://admin.usedodo.com/');

    const title = await page.title();
    expect(title).toContain('Dodo');

    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
});

test('Should login successfully with valid credentials', async ({ page }) => {
    await page.locator("#email").fill("dodoadmin@usedodo.com");
    await page.locator("#password").fill("password");
    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL('https://admin.usedodo.com/signin?from=%2F');
});

test('Should show error with invalid credentials', async ({ page }) => {
    await page.locator("#email").fill("dodoadmin@gmail.com");
    await page.locator("#password").fill("password123");
    await page.locator('button[type="submit"]').click();
    await expect(page.locator("(//div[@class='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded'])[1]")).toContainText('Failed to login');

});
test('Ensure system prevents login when fields are empty', async ({ page }) => {
    await page.locator('button[type="submit"]').click();
    await expect(page.locator("body > div:nth-child(2) > div:nth-child(1) > form:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > p:nth-child(1)")).toContainText('Email is required');
});

test('Should show error with invalid password credential', async ({ page }) => {
    await page.locator("#email").fill("dodoadmin@gmail.com");
    await page.locator("#password").fill("password123");
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('.bg-red-50')).toContainText('Failed to login')
});

test('Verify forgot password link lands user on the forgot password page', async ({ page }) => {
   await page.locator("a[href='/forgot']").click();
   await expect(page.locator("img[alt='dodo logo']")).toBeVisible()
});
