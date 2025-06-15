const { test, expect } = require('@playwright/test');

test('Auto Complete - verify RED & Green options', async ({ page }) => {
  await page.goto('https://demoqa.com/auto-complete');
  const input = page.locator('#autoCompleteMultipleInput');
  await input.fill('RE');
  // Wait for dropdown options to appear
  const options = page.locator('.auto-complete__option');
  await expect(options).toHaveCount(2);
  await expect(options.nth(0)).toHaveText('Red');
  await expect(options.nth(1)).toHaveText('Green');
});
