<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-5">Login</h1>
        <hr />
        <form method="post" aciton="/login" class="needs-validation" novalidate>
          <text-input-component
            label="Email"
            type="email"
            name="email"
            require="true"
          ></text-input-component>
          <text-input-component
            label="Password"
            type="password"
            name="password"
            require="true"
          ></text-input-component>
          <hr />
          <input type="submit" class="btn btn-primary" value="login" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
//importing components in use in current template
import TextInputComponent from "./forms/TextInputComponent.vue";
export default {
  //name the components use of exportation
  name: "LoginComponent",
  //listing the external components in use in the current template
  components: {
    TextInputComponent,
  },
  mounted() {
    (function () {
      "use strict";

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.querySelectorAll(".needs-validation");

      // Loop over them and prevent submission
      Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }

            form.classList.add("was-validated");
          },
          false
        );
      });
    })();
  },
};
</script>