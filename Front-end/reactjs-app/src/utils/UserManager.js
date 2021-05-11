import { useState } from 'react'
import Cookies from 'universal-cookie'
import { setCurrentWalletId } from './WalletManager'

const cookie = new Cookies()
const session = window.sessionStorage;
const USER_INFO = 'current_user'
const NOT_LOGIN = 'NOT_LOGIN'

export async function getUser() {
    if (cookie.get(USER_INFO) != null || cookie.get(USER_INFO) != undefined){
        console.log("getuser", cookie.get(USER_INFO))
        return await cookie.get(USER_INFO)
    }
    else{
        let user = session.getItem(USER_INFO);
        if (user !== NOT_LOGIN){
            console.log("getuser2", JSON.parse(user))
            return await JSON.parse(user)
        }
        console.log("getuser3", user)
        return await user
    }
}

export function setUser(user) {
    console.log("setUser", user)
    if (user.remember_me){
        cookie.set(USER_INFO, user)
    }
    else{
        if (user !== NOT_LOGIN){
            session.setItem(USER_INFO, JSON.stringify(user))
        }
        else{
            session.setItem(USER_INFO, user)
        }  
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

}