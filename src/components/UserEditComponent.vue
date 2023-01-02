<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">User</h1>
        <hr />
        <form-tag
          @userEditEvent="submitHandler"
          name="userform"
          event="userEditEvent"
        >
          <text-input
            v-model="user.first_name"
            type="text"
            required="true"
            label="First Name"
            :value="user.first_name"
            name="first-name"
          ></text-input>
          <text-input
            v-model="user.last_name"
            type="text"
            required="true"
            label="Last Name"
            :value="user.last_name"
            name="last-name"
          ></text-input>
          <text-input
            v-model="user.email"
            type="text"
            required="true"
            label="Email"
            :value="user.email"
            name="email"
          ></text-input>
          <text-input
            v-if="this.user.id === 0"
            v-model="user.password"
            type="password"
            required="true"
            label="Password"
            :value="user.password"
            name="password"
          ></text-input>
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
            <input type="submit" class="btn btn-primary me-2" value="Save" />
            <router-link to="/admin/users/" class="btn btn-outline-secondary"
              >Cancel</router-link
            >
            <div class="float-end">
              <span
                v-if="
                  this.$route.params.userId > 0 &&
                  parseInt(String(this.$route.params.userId), 10) !==
                    store.user.id
                "
                class="btn btn-danger"
                @click="confirmDelete(this.user.id)"
                >Delete</span
              >
            </div>
            <div class="clearfix"></div>
          </div>
        </form-tag>
      </div>
    </div>
  </div>
</template>

<script>
import Security from "./security.js";
import FormTagComponent from "./forms/FormTagComponent.vue";
import TextInputComponent from "./forms/TextInputComponent.vue";
import { store } from "./store";
import notie from "notie";

export default {
  beforeMount() {
    Security.requireToken();

    if (parseInt(String(this.$route.params.userId), 10) > 0) {
      //editting an existing user
      //TODO - get user from database
    }
  },
  data() {
    return {
      user: {
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      },
      store,
    };
  },
  components: {
    "form-tag": FormTagComponent,
    "text-input": TextInputComponent,
  },
  methods: {
    submitHandler() {
      const payload = {
        id: parseInt(String(this.$route.params.userId), 10),
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        password: this.user.password,
      };

      fetch(
        `${process.env.VUE_APP_API_URL}/admin/users/save`,
        Security.requestOptions(payload)
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            notie.alert({
              type: "error",
              text: data.message,
            });
          } else {
            notie.alert({
              type: "success",
              text: "Changes saved!",
            });
          }
        })
        .catch((error) => {
          notie.alert({
            type: "error",
            text: error.message,
          });
        });
    },
  },
  confirmDelete() {},
};
</script>
