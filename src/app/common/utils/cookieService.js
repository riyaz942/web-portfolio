/*
* @see: https://www.npmjs.com/package/js-cookie
* */

import Cookies from 'js-cookie'

// custom read and write handlers to store cookie as json
// and stop cookie from being encoded.
let jsCookie = Cookies.withConverter({
  read: function (value, name) {
    return value;
  },
  write: function (value, name) {
    return value;
  }
});

export const CookieService = {
  set(name, value, additional) {
    /*
    * @name: String, Its an cookie value
    * @value: String/Json, we can pass string value and json as well, json will automatically convert to Stringify
    * @additional:Object, its an object with {
    *   expires: 1,  // Valid for 1 day default:session cookie
    *   path: '',
    *   domain: "example.com",  // default: current domain
    *   secure: true, // default: false
    * }
    * */

    jsCookie.set(name, value, {
      ...additional,
      expires: 20
    });
  },
  get(name){
    return jsCookie.get(name);
  },
  getJSON(name){
    return jsCookie.getJSON(name);
  },
  delete(name){
    jsCookie.remove(name, { path: '' }); // removed!
  },
  checkIfCookieEnabled() {
    // REFERENCE: https://stackoverflow.com/a/43923580

    // Quick test if browser has cookieEnabled host property
    if (navigator.cookieEnabled) return true;
    // Create cookie
    document.cookie = 'cookietest=1';
    const ret = document.cookie.indexOf('cookietest=') !== -1;
    // Delete cookie
    document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
    return ret;
  },
};