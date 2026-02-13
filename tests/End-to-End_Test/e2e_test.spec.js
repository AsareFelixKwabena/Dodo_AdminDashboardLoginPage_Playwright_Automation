const {test, expect} = require('@playwright/test');


test.beforeEach('Navigate to Dodo Admin',async ({ page }) => {
    await page.goto('https://admin.usedodo.com/');
    console.log(await page.title())
});

test('End-to-end business flow of Dodo Admin Dashboard', async ({ page }) => {
    await page.locator("#email").fill("dodoadmin@usedodo.com");
    await page.locator("#password").fill("password");
    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL('https://admin.usedodo.com/signin?from=%2F');
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await page.waitForLoadState('networkidle');
    await page.locator("(//button[normalize-space()='Logout'])[1]").click();
    await expect(page).toHaveURL('https://admin.usedodo.com/signin');




});