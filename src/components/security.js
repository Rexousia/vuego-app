import router from "./../router/index.js";
import { store } from './store.js';

let Security = {
    // This function checks whether the user is authenticated by checking if the store's token
    // is an empty string.
    // If the user is not authenticated (i.e. the token is an empty string), the user is redirected
    // to the login page.
    // If the user is authenticated, the function returns false.
    requireToken: function() {
        if (store.token === "") {
          router.push("/login")
          return false
        }
      },

    // This function creates a set of request options (i.e. a headers object and a method) 
    // for making a POST request,
    // and includes the necessary authorization header with the store's token. 
    // It returns the options as an object.
    requestOptions: function(payload) {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", "Bearer " + store.token);

      return {
          method: "POST",
          body: JSON.stringify(payload),
          headers: headers,
      }
  }
}

export default Security;
