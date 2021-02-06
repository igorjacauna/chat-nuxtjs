<template>
  <v-container fill-height>
    <v-row justify="center">
      <v-btn color="primary" x-large dark @click="login"> Login </v-btn>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: 'login',
  methods: {
    async login() {
      const provider = new this.$fireModule.auth.GoogleAuthProvider();
      await this.$fire.auth.signInWithPopup(provider);
    },
  },
  watch: {
    "$store.state.auth.user"() {
      if (this.$store.state.auth.user) {
        this.$router.replace("/chats");
      }
    },
  },
  beforeMount() {
    if (this.$store.state.auth.user) {
      this.$router.replace("/chats");
    }
  },
};
</script>