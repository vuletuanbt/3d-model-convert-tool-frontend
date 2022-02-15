<template>
  <v-form>
    <h1>Register</h1>
    <v-container>
      <v-layout row wrap>
        <v-flex xs6 offset-xs3>
          <v-text-field
            label="Username"
            placeholder="Username"
            :value="registerUsername"
            @input="setRegisterUsername"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs6 offset-xs3>
          <v-text-field
            label="Email"
            placeholder="Email"
            :value="registerEmail"
            @input="setRegisterEmail"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs6 offset-xs3>
          <v-text-field
            type="password"
            label="Password"
            :value="registerPassword"
            @input="setRegisterPassword"
            placeholder="Password"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs6 offset-xs3>
          <v-alert type="error" :value="registerError">
            {{ registerError }}
          </v-alert>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs2 offset-xs5>
          <v-btn color="success" @click="register">
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
      'registerEmail',
      'registerUsername',
      'registerPassword',
      'registerError',
    ]),
  },
  methods: {
    ...mapMutations('authentication', [
      'setRegisterEmail',
      'setRegisterUsername',
      'setRegisterPassword',
      'setRegisterError',
    ]),
    ...mapActions('authentication', [
      'register',
    ]),
  },
};
</script>
