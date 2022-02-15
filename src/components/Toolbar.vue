<template>
  <v-toolbar color="green" dark fixed>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>
      <router-link :to="{name: 'files'}">
        3D Convert Tool
      </router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/register" v-if="!isLoggedIn">
        <v-icon class="mr-2">account_box</v-icon>
        Register
      </v-btn>
      <v-btn flat v-if="!isLoggedIn" to="/login">
        <v-icon class="mr-2">fingerprint</v-icon>
        Login
      </v-btn>
      <v-btn flat v-if="isLoggedIn" @click="logout">
        <v-icon class="mr-2">exit_to_app</v-icon>
        Logout
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    computed: {
      ...mapGetters('authentication', [
        'isLoggedIn',
      ]),
    },
    methods: {
      ...mapActions('authentication', [
        'logout',
      ]),
    },
  };
</script>

<style scoped lang="scss">
.router-link-exact-active, .router-link-active {
  color: white;
  text-decoration: none;
}
</style>
