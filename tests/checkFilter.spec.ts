import { test, expect, Page } from "@playwright/test";

import { users } from "../test-data/users";
import { UserLogin } from "../page-objects/login.page";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  const userLogin = new UserLogin(page);
  await userLogin.login(users.standard.username, users.standard.password);
});

const getNames = (page: Page) =>
  page.locator(".inventory_item_name").allTextContents();

const getPrices = async (page: Page) => {
  const priceTexts = await page
    .locator(".inventory_item_price")
    .allTextContents();
  const prices = priceTexts.map((p: string) => parseFloat(p.replace("$", "")));
  return prices;
};

test("Name A to Z", async ({ page }) => {
  await page.selectOption(".product_sort_container", "az");
  const names = await getNames(page);
  expect(names).toEqual([...names].sort());

});

test('Name Z to A', async ({ page }) => {
  await page.selectOption('.product_sort_container', 'za');
  const names = await getNames(page);
  expect(names).toEqual([...names].sort().reverse());
});

test('Price low to high', async ({ page }) => {
  await page.selectOption('.product_sort_container', 'lohi');
  const prices = await getPrices(page);
  expect(prices).toEqual([...prices].sort((a, b) => a - b));
});

test('Price high to low', async ({ page }) => {
  await page.selectOption('.product_sort_container', 'hilo');
  const prices = await getPrices(page);
  expect(prices).toEqual([...prices].sort((a, b) => b - a));
});