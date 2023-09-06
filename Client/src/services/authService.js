import http from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = config.apiUrl + "/auth";

const tokenKey = "token";

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, {
    email,
    password,
  });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
  window.location = "/";
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const jwtData = jwtDecode(jwt);
    const interval = Date.now() / 1000 - jwtData.exp;
    if (interval > 0) {
      logout();
    }
    return jwtData;
  } catch (ex) {
    return null;
  }
}

export function isAdmin() {
  const user = getCurrentUser();
  return !user ? false : !user.isAdmin ? false : true;
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

http.setJwt(getJwt());

const a = {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
  isAdmin,
};

export default a;
