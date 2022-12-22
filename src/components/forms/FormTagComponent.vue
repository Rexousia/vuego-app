<template>
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
    <slot></slot>
  </form>
</template>
<script>
export default {
  name: "FormTagComponent",
  props: ["method", "action", "name", "event"],
  methods: {
    newSubmit() {
      let myForm = this.$refs[this.$props.name];

      if (myForm.checkValidity()) {
        console.log("My event name", this.$props["event"]);
        console.log("Name", this.$props.name);
        this.$emit(this.$props["event"]);
      }
      myForm.classList.add("was-validated");
    },
  },
};
</script>