import {Page, Locator} from '@playwright/test'

export class UserLogin{
    private readonly page: Page
    constructor(page: Page){
        this.page = page
    }


    async loginValidUser(username:string, password:string){
        const userName: Locator = this.page.locator('[data-test="username"]')
        await userName.fill(username)
        const userPassword: Locator =  this.page.locator('[data-test="password"]')
        await userPassword.fill(password)
        await this.page.locator('[data-test="login-button"]').click();
    }
}