import jwtDecode from "jwt-decode";

const TOKEN_KEY = "jwt";
const storeToken = jwt => {
  try {
    jwtDecode(jwt);
  } catch (e) {
    throw { name: "InvalidTokenException", message: "Invalid jwt" };
  }
  localStorage.setItem(TOKEN_KEY, jwt);
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const hasPrivilege = (MenuID, Action = "R") => {
  try {
    const privileges = jwtDecode(getToken()).Privileges;
    return (
      privileges.filter(e => e.MenuID === MenuID && e[Action] == 1).length == 1
    );
  } catch (e) {
    return false;
  }
};

const get = key => {
  const jwt = getToken();
  try {
    return jwtDecode(jwt)[key];
  } catch (e) {
    return null;
  }
};

const getUserID = () => {
  return get("UserID");
};

const getVendorCode = () => {
  return get("VendorCode");
};

const getMenu = () => {
  return get("Menu");
};

const getUserGroupID = () => {
  return get("UserGroupID");
};

const getUserGroup = () => {
  return get("UserGroup");
};
const getUserName = () => {
  return get("UserName");
};
const logout = () => {
  localStorage.clear();
};

export default {
  storeToken,
  getToken,
  hasPrivilege,
  getUserID,
  getVendorCode,
  getMenu,
  logout,
  getUserGroupID,
  getUserGroup,
  getUserName
};
