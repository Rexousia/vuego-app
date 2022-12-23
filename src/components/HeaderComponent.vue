<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <!-- Linking to '/' home inside of router index.js with router link-->
            <router-link class="nav-link active" aria-current="page" to="/"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <!-- Linking to '/login' login inside of router index.js with router link-->
            <router-link v-if="store.token == ''" class="nav-link" to="/login"
              >Login</router-link
            >
            <a
              href="javascript:void(0);"
              v-else
              class="nav-link"
              @click="logout"
              >Logout</a
            >
          </li>
        </ul>

        <span class="navbar-text">
          {{ store.user.first_name ?? "" }}
        </span>
      </div>
    </div>
  </nav>
</template>

<script>
import { store } from "./store.js";
import router from "./../router/index.js";
export default {
  data() {
    return {
      store,
    };
  },
  methods: {
    logout() {
      // Define payload object with token property
      const payload = {
        token: store.token,
      };

      // Define request options object with method and body properties
      const requestOption = {
        method: "POST",
        body: JSON.stringify(payload),
      };

      // Send POST request to server with request options
      fetch("http://localhost:8081/users/logout", requestOption)
        .then((response) => {
          // Parse response as JSON
          return response.json();
        })
        .then((response) => {
          // If response contains an error, log it to the console
          if (response.error) {
            console.log(response.error);
          } else {
            // If no error, clear token and redirect to login page
            store.token = "";
            store.user = {};

            // Set the value of the cookie with the name "_site_data" to an empty string.
            // The cookie will be set to expire on January 1, 1970.
            // The cookie will be set to be accessible only from the same site and to be transmitted only over secure connections.
            document.cookie =
              "_site_data=; Path=/; " +
              "SameSite=Strict; Secure; " +
              "Expires=Thu, 01 Jan 1970 00:00:01 GMT";

            router.push("/login");
          }
        });
    },
  },
};
</script>