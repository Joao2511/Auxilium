const KEY = "AUXI_JWT";
export const getJWT = () => sessionStorage.getItem(KEY);
export const setJWT = (t) => sessionStorage.setItem(KEY, t);
export const clearAuth = () => sessionStorage.removeItem(KEY);
