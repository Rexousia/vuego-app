<template>
  <!-- This template defines the HTML structure for a text input field in a form -->
  <div class="mb-3">
    <!-- Label for the input field -->
    <label :for="name" class="form-label">{{ label }}</label>
    <!-- Input field for the text input -->
    <input
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :min="min"
      :max="max"
      :value="modelValue"
      :autocomplete="name + '-new'"
      @input="$emit('update:modelValue', $event.target.value)"
      class="form-control"
    />
  </div>
</template>
<script>
export default {
  name: "TextInputComponent",
  // Props for the text input component
  props: {
    name: String,
    type: String,
    label: String,
    placeholder: String,
    required: String,
    min: String,
    max: String,
    modelValue: String,
  },
};
</script>
