import Cookie from 'universal-cookie'

const cookie = new Cookie()

export function getUser() {
    return cookie.get('user')
}

export function setUser(user) {
    cookie.set("user", user)
}

export default function User() {
}