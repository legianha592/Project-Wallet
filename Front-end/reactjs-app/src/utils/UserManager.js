import { useState } from 'react'
import Cookies from 'universal-cookie'
import { setCurrentWalletId } from './WalletManager'

const cookie = new Cookies()
const session = window.sessionStorage;
const USER_INFO = 'current_user'
const NOT_LOGIN = 'NOT_LOGIN'

export async function getUser() {
    let sessionUser = JSON.parse(session.getItem(USER_INFO));
    let cookieUser = cookie.get(USER_INFO)
    console.log("get user", sessionUser, cookieUser)
    if (cookie.get(USER_INFO) === NOT_LOGIN && JSON.parse(session.getItem(USER_INFO)) === NOT_LOGIN){
        console.log("case 1")
        return await NOT_LOGIN
    }
    else{
        if (cookie.get(USER_INFO) === NOT_LOGIN){
            console.log("case 2")
            return await JSON.parse(session.getItem(USER_INFO))
        }
        else{
            console.log("case 3")
            return await cookie.get(USER_INFO)
        }
    }
       
 }
 
 export function setUser(user) {
     console.log("setUser", user)
     if (user == NOT_LOGIN){
         session.setItem(USER_INFO, user)
         cookie.set(USER_INFO, user)
     }
     else{
         if (user.remember_me){
             session.setItem(USER_INFO, NOT_LOGIN)
             cookie.set(USER_INFO, user)
         }
         else{
             session.setItem(USER_INFO, JSON.stringify(user))
             cookie.set(USER_INFO, NOT_LOGIN)
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