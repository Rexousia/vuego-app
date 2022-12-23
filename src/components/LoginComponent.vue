<template>
  <!-- This template defines the HTML structure for the login form -->
  <div class="container">
    <div class="row">
      <div class="col">
        <!-- Title for the form -->
        <h1 class="mt-5">Login</h1>
        <hr />
        <!-- FormTagComponent is a custom component that serves as a wrapper for the form.
            It listens for the "myevent" event and calls the "submitHandler" method when the event is emitted.
            The "name" and "event" props are passed down to the FormTagComponent. -->
        <form-tag-component
          @myevent="submitHandler"
          name="myform"
          event="myevent"
        >
          <!-- TextInputComponent is a custom component that represents a text input field in the form.
              It has a "v-model" directive that binds the value of the input field to the "email" data property.
              The "label", "type", "name", and "required" props are passed down to the TextInputComponent. -->
          <text-input-component
            v-model="email"
            label="Email"
            type="email"
            name="email"
            required="true"
          ></text-input-component>
          <!-- Same as the previous TextInputComponent, but for the password field -->
          <text-input-component
            v-model="password"
            label="Password"
            type="password"
            name="password"
            required="true"
          ></text-input-component>
          <hr />
          <hr />
          <!-- Submit button for the form -->
          <input type="submit" class="btn btn-primary" value="login" />
        </form-tag-component>
      </div>
    </div>
  </div>
</template>

<script>
//importing components in use in current template
import FormTagComponent from "./forms/FormTagComponent.vue";
import TextInputComponent from "./forms/TextInputComponent.vue";
import { store } from "./store.js";
import router from "./../router/index.js";
import notie from "notie";
export default {
  //name the components use of exportation
  name: "LoginComponent",
  //listing the external components in use in the current template
  components: {
    FormTagComponent,
    TextInputComponent,
  },
  data() {
    return {
      // Data properties for the email and password fields
      email: "",
      password: "",
      store,
    };
  },
  methods: {
    // Method that is called when the "myevent" event is emitted by the FormTagComponent
    submitHandler() {
      console.log("submitHandler called - success!");

      // Create the payload object with the email and password fields
      const payload = {
        email: this.email,
        password: this.password,
      };

      // Set the request options for the POST request
      const requestOptions = {
        method: "POST",
        body: JSON.stringify(payload),
      };

      // Send a POST request to the server at the specified URL.
      fetch("http://localhost:8081/users/login", requestOptions)
        // The server returns a response. If the response is successful (status code in the 200-299 range),
        // the response's JSON payload is parsed and passed to the next then() block.
        .then((response) => response.json())
        // If the response contains an "error" field, log the error message and display an error alert.
        // Otherwise, log the data object and update the store with the data from the response.
        .then((response) => {
          if (response.error) {
            console.log("Error:", response.message);
            notie.alert({
              type: "error",
              text: response.message,
              //stay: true, (want the alert to stay)
              //position: 'bottom', (where do you want the alert displayed)
            });
          } else {
            console.log("Token", response.data.token.token);
            store.token = response.data.token.token;

            store.user = {
              id: response.data.user.id,
              first_name: response.data.user.first_name,
              last_name: response.data.user.last_name,
              email: response.data.user.email,
            };
            // Save the response data to a cookie with the name "_site_data".
            let date = new Date();
            let expDays = 1;
            date.setTime(date.getTime() + expDays * 24 * 60 * 1000);
            const expires = "expires=" + date.toUTCString();
            document.cookie =
              "_site_data=" +
              JSON.stringify(response.data) +
              "; " +
              expires +
              "; path=/; SameSite=strict; Secure;";
            // Redirect to the home page.
            router.push("/");
          }
        });
    },
  },
};
</script>