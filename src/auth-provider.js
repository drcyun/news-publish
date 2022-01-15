// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发。

const localStorageKey = 'token';

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const setToken = (token) => window.localStorage.setItem(localStorageKey, token);

export const deleteToken = () => window.localStorage.removeItem(localStorageKey);

export const login = (userInfo) => {

}
