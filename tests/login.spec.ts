import {test,expect} from '@playwright/test'
import {UserLogin} from '../page-objects/login.page'
import {users} from '../test-data/users'


const successfulLoginUsers = [
    users.standard,
    users.problem,
    users.performanceGlitch,
    users.visual


]

for (const user of successfulLoginUsers){

    test(`${user.username} can log in successfully`, async({page})=>{
    await page.goto('/')
    const userLogin = new UserLogin(page)
    await userLogin.loginValidUser(user.username, user.password)
    await expect(page).toHaveURL(/inventory.html/)

})

}

