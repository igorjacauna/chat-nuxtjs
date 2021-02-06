<template>
  <v-app>
    <v-app-bar app>
      <v-avatar>
        <img :src="$store.state.auth.user.photoURL" />
      </v-avatar>
      <v-btn text @click="logout">
        Sair
      </v-btn>
    </v-app-bar>
    <v-main app>
      <nuxt />
    </v-main>
  </v-app>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$fire.auth.signOut()
      this.$router.replace('/')
    }
  }
}
</script>