import Cookies from "universal-cookie";

const cookie = new Cookies();
const session = window.sessionStorage;
const USER_INFO = "current_user";
const NOT_LOGIN = "NOT_LOGIN";

export async function getUser() {
  let cookieUser = await cookie.get(USER_INFO);
  if (cookieUser !== NOT_LOGIN) {
    console.log("get user case 1", cookieUser);
    return cookieUser;
  }

  let sessionUser = session.getItem(USER_INFO);
  if (sessionUser !== NOT_LOGIN) {
    console.log("get user case 2", sessionUser);
    return await JSON.parse(sessionUser);
  }

  console.log("case 3", NOT_LOGIN);
  return NOT_LOGIN;
}

export function setUser(user) {
  session.setItem(USER_INFO, NOT_LOGIN);
  cookie.set(USER_INFO, NOT_LOGIN);
  console.log("setUser", user);
  if (user !== NOT_LOGIN) {
    if (user.remember_me) {
      cookie.set(USER_INFO, user);
    } else {
      session.setItem(USER_INFO, JSON.stringify(user));
    }
  }
}

export function removeUser() {
  console.log("remove User");
  // cookie.remove(USER_INFO)
  setUser(NOT_LOGIN);
}

export async function isLoggedIn() {
  let user = await getUser();
  if (user === undefined || user === null || user === "undefined") {
    setUser(NOT_LOGIN);
  }

  let isLoggedIn = user !== NOT_LOGIN;

  console.log("isLoggedIn: ", isLoggedIn, typeof user);
  return isLoggedIn;
}

export default function User() {}
