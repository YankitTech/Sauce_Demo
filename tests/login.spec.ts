import {test,expect} from '@playwright/test'
import {UserLogin} from '../page-objects/login.page'
import {users} from '../test-data/users'

const successfulLoginUsers = [
    users.standard,
    users.problem,
    users.performanceGlitch,
    users.visual,
]

const failedLoginCases = [
    {
        name: 'wrong password',
        username: users.standard.username,
        password: 'wrong_password',
        error: 'Username and password do not match any user in this service',
    },
    {
        name: 'locked out user',
        username: users.lockedOut.username,
        password: users.lockedOut.password,
        error: 'Sorry, this user has been locked out.',
    },
    {
        name: 'empty username',
        username: '',
        password: users.standard.password,
        error: 'Username is required',
    },
    {
        name: 'empty password',
        username: users.standard.username,
        password: '',
        error: 'Password is required',
    },
]

// Success tests
for (const user of successfulLoginUsers) {
    test(`${user.username} can log in successfully`, async ({page}) => {
        await page.goto('/')
        const userLogin = new UserLogin(page)
        await userLogin.loginValidUser(user.username, user.password)
        await expect(page).toHaveURL(/inventory.html/)
    })
}

// Failure tests (separate loop, NOT inside the one above)
for (const c of failedLoginCases) {
    test(`login fails: ${c.name}`, async ({page}) => {
        await page.goto('/')
        const userLogin = new UserLogin(page)
        await userLogin.login(c.username, c.password)
        await expect(userLogin.errorMessage).toBeVisible()
        await expect(userLogin.errorMessage).toContainText(c.error)
        await expect(page).not.toHaveURL(/inventory/)
    })
}