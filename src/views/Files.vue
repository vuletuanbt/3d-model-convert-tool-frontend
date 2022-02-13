<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <Files></Files>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import Files from '@/components/Files';

import router from '../router';

export default {
  components: {
    Files,
  },
  mounted() {
    if (!this.isLoggedIn) {
      return router.push('/login');
    }
  },
  computed: {
    ...mapGetters('authentication', [
      'isLoggedIn',
    ]),
  },
};
</script>
