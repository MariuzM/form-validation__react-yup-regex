import { expect, test } from '@playwright/test';

export const config = {
  website: 'http://localhost:5123/',
};

test.describe('Form check', () => {
  test('Check if page is alive', async ({ page }) => {
    await page.goto(config.website);
  });

  test('Check if form elements are present', async ({ page }) => {
    await page.goto(config.website);
    const checkIsVisible = [
      'form-container',
      'form',
      'form-field__name',
      'input__name',
      'form-field__country',
      'input__country',
      'form-field__taxid',
      'input__taxid',
      'form-field__submit',
    ];

    for (let i = 0; i < checkIsVisible.length; i++) {
      const e = checkIsVisible[i];
      await expect(page.locator(`data-testid=${e}`)).toBeVisible();
    }

    const checkIsNotVisible = ['error__server', 'error__name', 'error__country', 'error__taxid'];

    for (let i = 0; i < checkIsNotVisible.length; i++) {
      const e = checkIsNotVisible[i];
      expect(page.locator(`data-testid=${e}`)).toBeHidden();
    }
  });

  test('Check input', async ({ page }) => {
    await page.goto(config.website);
    await page.locator('data-testid=input__name').click();
    await page.locator('data-testid=input__name').fill('Marius');
    await expect(page.locator('data-testid=input__name')).toHaveAttribute('value', 'Marius');

    await page.locator('data-testid=input__country').click();
    await expect(page.locator('data-testid=drop-down__country')).toBeVisible();
    await (
      await page.waitForSelector('data-testid=drop-down__country >> .drop-down-item >> nth=1')
    ).click();
    await expect(page.locator('data-testid=input__country')).toHaveAttribute('value', 'Canada');
    await expect(page.locator('data-testid=pattern-container')).toBeVisible();

    await page.locator('data-testid=input__taxid').click();
    await page.locator('data-testid=input__taxid').fill('abcde@!!21-22');
    await expect(page.locator('data-testid=input__taxid')).toHaveAttribute(
      'value',
      'abcde@!!21-22'
    );
  });

  test('Check errors', async ({ page }) => {
    await page.goto(config.website);
    await page.locator('data-testid=form-field__submit').click();
    await expect(page.locator('data-testid=error__name')).toBeVisible();
    await expect(page.locator('data-testid=error__name')).toHaveText('Name field is required');
    await expect(page.locator('data-testid=error__country')).toBeVisible();
    await expect(page.locator('data-testid=error__country')).toHaveText(
      'Country field is required'
    );
    await expect(page.locator('data-testid=error__taxid')).toBeVisible();
    await expect(page.locator('data-testid=error__taxid')).toHaveText('Country not selected');

    await page.locator('data-testid=input__name').click();
    await page.locator('data-testid=input__name').fill('Ma');
    await page.locator('data-testid=form-field__submit').click();
    await expect(page.locator('data-testid=error__name')).toHaveText(
      'Name must contain minimum 3 charakters'
    );
    await page.locator('data-testid=input__name').fill('Marius');
    await page.locator('data-testid=form-field__submit').click();
    expect(page.locator('data-testid=error__name')).toBeHidden();
  });

  test('Fill form and submit', async ({ page }) => {
    await page.goto(config.website);
    await page.locator('data-testid=input__name').click();
    await page.locator('data-testid=input__name').fill('Marius');
    await page.locator('data-testid=input__country').click();
    await expect(page.locator('data-testid=drop-down__country')).toBeVisible();
    await (
      await page.waitForSelector('data-testid=drop-down__country >> .drop-down-item >> nth=1')
    ).click();
    await page.locator('data-testid=input__taxid').click();
    await page.locator('data-testid=input__taxid').fill('abcde@!!21-22');
    await page.locator('data-testid=form-field__submit').click();
    await expect(page.locator('data-testid=error__server')).toBeVisible();
  });
});
