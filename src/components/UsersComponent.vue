<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">All Users</h1>
      </div>
      <hr />

      <table class="table table-compact table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in this.users" v-bind:key="u.id">
            <td>
              <router-link :to="`/admin/users/${u.id}`"
                >{{ u.last_name }}, {{ u.first_name }}</router-link
              >
            </td>
            <td>{{ u.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Security from "./security.js";
import notie from "notie";

export default {
  data() {
    return {
      users: [],
    };
  },
  beforeMount() {
    // Check if a valid token is present
    Security.requireToken();

    // Make a request to the API to retrieve a list of users
    fetch(
      process.env.VUE_APP_API_URL + "/admin/users",
      Security.requestOptions("")
    )
      .then((response) => {
        // Parse the response as JSON
        return response.json();
      })
      .then((response) => {
        // Check for an error in the response
        if (response.error) {
          // Display an error notification if there is an error
          notie.alert({
            type: "error",
            text: response.message,
          });
        } else {
          // Assign the list of users to the component's data property
          this.users = response.data.users;
        }
      })
      .catch((error) => {
        // Display an error notification if there is a problem with the request or parsing the response
        notie.alert({
          type: "error",
          text: error,
        });
      });
  },
};
</script>