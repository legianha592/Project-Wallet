import Cookies from 'universal-cookie'

const cookie = new Cookies()
const USER_INFO = 'current_user'

export async function getUser() {
    return await cookie.get(USER_INFO)
}

export function setUser(user) {
    console.log("setUser", user, { path: '/' })
    cookie.set(USER_INFO, user)
}

export function removeUser() {
    console.log("remove User")
    cookie.remove(USER_INFO)
}



export async function isLoggedIn() {
    let user = await getUser()
    let isLoggedIn = user !== undefined
    console.log("isLoggedIn: ", isLoggedIn, user)
    return isLoggedIn
}

export default function User() {
}