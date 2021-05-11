import { useState } from 'react'
import Cookies from 'universal-cookie'
import { setCurrentWalletId } from './WalletManager'

const cookie = new Cookies()
const session = window.sessionStorage;
const USER_INFO = 'current_user'
const NOT_LOGIN = 'NOT_LOGIN'

export async function getUser() {
    if (cookie.get(USER_INFO) != null){
        return await cookie.get(USER_INFO)
    }
    return await session.getItem(USER_INFO)
}

export function setUser(user) {
    console.log("setUser", user)
    if (user.remember_me){
        cookie.set(USER_INFO, user)
    }
    else{
        session.setItem(USER_INFO, user)
    }
}

export function removeUser() {
    console.log("remove User")
    // cookie.remove(USER_INFO)
    setUser(NOT_LOGIN)
}



export async function isLoggedIn() {
    let user = await getUser()
    if (user === undefined || user === null || user === "undefined") {
        setUser(NOT_LOGIN)
    }

    let isLoggedIn = user !== NOT_LOGIN

    console.log("isLoggedIn: ", isLoggedIn, typeof user)
    return isLoggedIn
}

export default function User() {
    const [state, setState] = useState({
        current_user: null
    })
}