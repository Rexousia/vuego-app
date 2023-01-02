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
            <router-link class="nav-link active" to="/books">Books</router-link>
          </li>

          <!-- This element will only be displayed if the store's token property is not an empty string -->
          <li v-if="store.token !== ''" class="nav-item dropdown">
            <!-- This is a dropdown menu for the Admin menu item -->
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navBarDropDown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Admin</a
            >
            <!-- This is the dropdown menu that appears when the Admin menu item is clicked -->
            <!-- aria-labelledby is an attribute of the ul element. 
            It is used to associate the dropdown menu with its trigger element, 
            which is the a element with the nav-link dropdown-toggle classes. -->
            <ul class="dropdown-menu" aria-labelledby="navBarDropDown">
              <!-- This is a menu item that links to the Manage Users page -->
              <li>
                <router-link class="dropdown-item" to="/admin/users">
                  Manager Users
                </router-link>
              </li>
              <!-- This is a menu item that links to the Add User page -->
              <li>
                <!--  Specifying redirect to when they click on the link. Adding user by adding "0"
                PostgreSQL starts counting at one -->
                <router-link class="dropdown-item" to="/admin/users/0">
                  Add User
                </router-link>
              </li>
              <!-- This is a menu item that links to the Manage Books page -->
              <li>
                <router-link class="dropdown-item" to="/admin/books">
                  Manage Books
                </router-link>
              </li>
              <!-- This is a menu item that links to the Add Book page -->
              <li>
                <!-- :to="{ name: 'BookEditComponent', params: { bookId: 0 } }"
                      - Binding for router-link component that specifies destination route and any additional data or parameters to be passed to the route
                      - name: Name of component to be rendered by the route
                      - params: Object containing data or parameters to be passed to the component-->
                <router-link
                  class="dropdown-item"
                  :to="{ name: 'BookEditComponent', params: { bookId: 0 } }"
                >
                  Add Book
                </router-link>
              </li>
            </ul>
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

        <!-- This element displays the first name of the user from the store, or an empty string if the user's first name is not defined -->
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
import Security from "./security.js";
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

      // Send POST request to server with request options
      // This line makes a fetch request to the logout API endpoint of the application's backend server,
      // passing in the request options created by the Security module's requestOptions function.
      // The API URL is stored in the VUE_APP_API_URL environment variable,
      // which is set in the application's configuration.
      fetch(
        process.env.VUE_APP_API_URL + "/users/logout",
        Security.requestOptions(payload)
      )
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