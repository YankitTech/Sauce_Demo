import { test, expect, Page } from "@playwright/test";

import { users } from "../test-data/users";
import { UserLogin } from "../page-objects/login.page";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  const userLogin = new UserLogin(page);
  await userLogin.login(users.standard.username, users.standard.password);
});

test("Add single item to cart", async ({ page }) => {
  await page.locator('[data-test = "add-to-cart-sauce-labs-backpack"]').click();
  await expect(
    page.locator('[data-test = "remove-sauce-labs-backpack"]'),
  ).toBeVisible();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText(
    "1",
  );
});

test("Add multiple items to cart", async ({ page }) => {
  await page.locator('[data-test= "add-to-cart-sauce-labs-backpack"]').click();
  await expect(
    page.locator('[data-test = "remove-sauce-labs-backpack"]'),
  ).toBeVisible();
  await page
    .locator('[data-test = "add-to-cart-sauce-labs-fleece-jacket"]')
    .click();

  await expect(
    page.locator('[data-test = "remove-sauce-labs-fleece-jacket"]'),
  ).toBeVisible();
  await expect(page.locator('[data-test = "shopping-cart-badge"]')).toHaveText(
    "2",
  );
});
