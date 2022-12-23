<template>
  <HeaderComponent />
  <div>
    <router-view />
  </div>
  <FooterComponent />
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import { store } from "./components/store.js";

// This function returns the value of a cookie with the given name.
// If the cookie does not exist, an empty string is returned.
const getCookie = (name) => {
  // Split the document.cookie string into an array of individual cookie strings
  // using "; " as the separator.
  // Then, use the reduce function to iterate over the array and return the value
  // of the cookie with the given name.
  // If no such cookie is found, the initial value ("") is returned.
  return document.cookie.split("; ").reduce((r, v) => {
    // Split each cookie string into a name-value pair using "=".
    const parts = v.split("=");
    // If the name of the current cookie matches the given name, return its value.
    // Otherwise, return the accumulator value (r).
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "");
};

export default {
  name: "App",
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      store,
    };
  },
  beforeMount() {
    // This function is called before the Vue component is mounted (i.e., before it is added to the DOM).

    // Check for a cookie with the name "_site_data".
    let data = getCookie("_site_data");

    // If the cookie exists (i.e., its value is not an empty string),
    if (data !== "") {
      // parse the cookie value as JSON.
      let cookieData = JSON.parse(data);

      // Update the store with the data from the cookie.
      store.token = cookieData.token.token;
      store.user = {
        id: cookieData.user.id,
        first_name: cookieData.user.first_name,
        last_name: cookieData.user.last_name,
        email: cookieData.user.email,
      };
    }
  },
};
</script>

<style>
</style>