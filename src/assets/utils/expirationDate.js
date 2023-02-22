const expirationDate = 1000 * 60 * 60 * 9;

export function token_exist() {
  if (!JSON.parse(localStorage.getItem("token"))) {
    return false;
  } else {
    const token_time = JSON.parse(localStorage.getItem("token"));
    const flag = new Date().getTime() - token_time < expirationDate;
    return token_time && flag;
  }
}
