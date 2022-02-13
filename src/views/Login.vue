<template>
  <v-form>
    <h1>Login</h1>
    <v-container>
      <v-layout row wrap>
        <v-flex xs6 offset-xs3>
          <v-text-field
            label="User Name"
            placeholder="User Name"
            :value="loginUserName"
            @input="setloginUserName"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs6 offset-xs3>
          <v-text-field
            type="password"
            label="Password"
            :value="loginPassword"
            @input="setLoginPassword"
            placeholder="Password"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs6 offset-xs3>
          <v-alert type="error" :value="loginError">
            {{loginError}}
          </v-alert>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs2 offset-xs5>
          <v-btn color="success" @click="login">
            <v-icon>account_circle</v-icon>
            Submit
          </v-btn>
        </v-flex>
      </v-layout>

    </v-container>
  </v-form>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex';

  export default {
    computed: {
      ...mapState('authentication', [
        'loginUserName',
        'loginPassword',
        'loginError',
      ]),
    },
    methods: {
      ...mapMutations('authentication', [
        'setloginUserName',
        'setLoginPassword',
        'setLoginError',
      ]),
      ...mapActions('authentication', [
        'login',
      ]),
    },
  };
</script>
