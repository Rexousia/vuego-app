<template>
  <!-- This template defines a form element with a submit event listener bound to the "newSubmit" method -->
  <form
    @submit.prevent="newSubmit"
    :ref="name"
    :event="event"
    autocomplete="off"
    :action="action"
    :method="method"
    class="needs-validation"
    novalidate
  >
    <!-- The form element has a slot, which allows content (e.g., form fields) to be passed to the component and rendered inside the form -->
    <slot></slot>
  </form>
</template>
<script>
export default {
  name: "FormTagComponent",
  // Props for the component
  props: ["method", "action", "name", "event"],
  methods: {
    // Method that is called when the submit event is emitted on the form element
    newSubmit() {
      // Get a reference to the form element using the "name" prop
      let myForm = this.$refs[this.$props.name];

      // Check the validity of the form
      if (myForm.checkValidity()) {
        // Log some information to the console and emit the "event" event
        console.log("My event name", this.$props["event"]);
        console.log("Name", this.$props.name);
        this.$emit(this.$props["event"]);
      }
      // Add the "was-validated" class to the form element
      myForm.classList.add("was-validated");
    },
  },
};
</script>
