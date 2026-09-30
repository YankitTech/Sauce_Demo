import { Page, Locator } from "@playwright/test";

export class UserLogin {
  private readonly page: Page;
  readonly errorMessage: Locator;
  constructor(page: Page) {
    this.page = page;
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async login(username: string, password: string) {
    await this.page.locator('[data-test="username"]').fill(username);
    await this.page.locator('[data-test="password"]').fill(password);
    await this.page.locator('[data-test="login-button"]').click();
  }


}
