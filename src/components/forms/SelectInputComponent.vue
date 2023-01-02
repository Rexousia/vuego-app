<template>
  <div class="mb-3">
    <label :for="name" class="form-label">{{ label }}</label>
    <select :id="name" class="form-select" :name="name" :required="required">
      <!-- This template element uses the v-for directive to loop over the items prop, which is expected to be an array of objects -->
      <!-- The v-bind directive is used to bind the value of option.value to the value attribute of the option element -->
      <!-- The v-bind directive is used to bind the value of option.value to the key attribute of the option element -->
      <option v-for="option in items" :value="option.value" :key="option.value">
        <!-- This interpolation will output the value of option.text for each iteration of the loop -->
        {{ option.text }}
      </option>
    </select>
  </div>
</template>
<script>
export default {
  name: "SelectInputComponent",
  props: ["items", "name", "required", "label"],
};
</script>