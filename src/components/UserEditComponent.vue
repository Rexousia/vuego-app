<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">User</h1>
        <hr />
        <!-- listens for userEditEvent emitted by FormTagComponent and calls submitHandler method-->

        <form-tag
          @userEditEvent="submitHandler"
          name="userform"
          event="userEditEvent"
        >
          <!-- text input for first name -->
          <!--  two-way binding to user.first_name  -->
          <!-- bind value of input to user.first_name -->

          <text-input
            v-model="user.first_name"
            type="text"
            required="true"
            label="First Name"
            :value="user.first_name"
            name="first-name"
          ></text-input>

          <!-- text input for last name -->
          <!-- two-way binding to user.last_name data  -->
          <!--  bind value of input to user.last_name -->

          <text-input
            v-model="user.last_name"
            type="text"
            required="true"
            label="Last Name"
            :value="user.last_name"
            name="last-name"
          ></text-input>
          <!-- text input for email -->
          <!-- two-way binding to user.email data property -->
          <!-- bind value of input to user.email -->
          <text-input
            v-model="user.email"
            type="email"
            required="true"
            label="Email"
            :value="user.email"
            name="email"
          ></text-input>
          <!-- text input for password -->
          <!-- show password input only if user.id is 0 (new user) -->
          <!-- two-way binding to user.password data property -->
          <!-- bind value of input to user.password -->
          <text-input
            v-if="this.user.id === 0"
            v-model="user.password"
            type="password"
            required="true"
            label="Password"
            :value="user.password"
            name="password"
          ></text-input>

          <!-- show password input for existing users, but not required -->
          <!-- two-way binding to user.password data property -->
          <!-- bind value of input to user.password -->
          <text-input
            v-else
            v-model="user.password"
            type="password"
            label="Password"
            :value="user.password"
            name="password"
          ></text-input>

          <hr />
          <div class="float-start">
            <!-- submit button -->
            <input type="submit" class="btn btn-primary me-2" value="Save" />
            <!-- cancel button -->
            <router-link to="/admin/users" class="btn btn-outline-secondary"
              >Cancel</router-link
            >
          </div>
          <div class="float-end">
            <!-- delete button -->
            <!-- listen for click event and call confirmDelete method with user.id as argument -->
            <a
              v-if="
                this.$route.params.userId > 0 &&
                parseInt(String(this.$route.params.userId), 10) !==
                  store.user.id
              "
              class="btn btn-danger"
              href="javascript:void(0);"
              @click="confirmDelete(this.user.id)"
              >Delete</a
            >
          </div>
          <div class="clearfix"></div>
        </form-tag>
      </div>
    </div>
  </div>
</template>

<script>
// import security module
import Security from "./security.js";
// import FormTagComponent
import FormTagComponent from "./forms/FormTagComponent.vue";
// import TextInputComponent
import TextInputComponent from "./forms/TextInputComponent.vue";
// import notie library for notifications
import notie from "notie";
// import store object
import { store } from "./store";

export default {
  beforeMount() {
    // check for valid token
    Security.requireToken();

    if (parseInt(String(this.$route.params.userId), 10) > 0) {
      // if userId parameter in route is greater than 0, retrieve user data from database
      // TODO - get user from database
    }
  },
  data() {
    return {
      user: {
        // default value for new user
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      },
      // store object
      store,
    };
  },
  components: {
    // form-tag component
    "form-tag": FormTagComponent,
    // text-input component
    "text-input": TextInputComponent,
  },
  methods: {
    submitHandler() {
      const payload = {
        // get userId from route parameter
        id: parseInt(String(this.$route.params.userId), 10),
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        password: this.user.password,
      };
      // send request to save user data
      fetch(
        `${process.env.VUE_APP_API_URL}/admin/users/save`, // API endpoint for saving user data
        Security.requestOptions(payload) // create request options object with payload and security headers
      )
        .then((response) => response.json())
        .then((data) => {
          // if there is an error, display notification
          if (data.error) {
            notie.alert({
              type: "error",
              text: data.message,
            });
          } else {
            // if successful, display notification and redirect to /admin/users
            notie.alert({
              type: "success",
              text: "Changes saved!",
            });
          }
        })
        .catch((error) => {
          notie.alert({
            type: "error",
            text: error,
          });
        });
    },
    confirmDelete() {},
  },
};
</script>