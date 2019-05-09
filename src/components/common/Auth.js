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

const getUserID = () => {
  const jwt = getToken();
  try {
    return jwtDecode(jwt).UserID;
  } catch (e) {
    return null;
  }
};

const getVendorCode = () => {
  const jwt = getToken();
  try {
    return jwtDecode(jwt).VendorCode;
  } catch (e) {
    return null;
  }
};

const getMenu = () => {
  const jwt = getToken();
  try {
    return jwtDecode(jwt).Menu;
  } catch (e) {
    return null;
  }
};

export default {
  storeToken,
  getToken,
  hasPrivilege,
  getUserID,
  getVendorCode,
  getMenu
};
