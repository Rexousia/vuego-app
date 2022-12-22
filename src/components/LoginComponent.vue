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
          Email: {{ email }}
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

      // Send the POST request to the server
      fetch("http://localhost:8081/users/login", requestOptions)
        .then((response) => response.json())
        .then((response) => {
          // If there's an error, log the error message
          if (response.error) {
            console.log("Error:", response.message);
          } else {
            // If there's no error, log the data object
            console.log("Token", response.data.token.token);
            store.token = response.data.token.token;
          }
        });
    },
  },
};
</script>