export default {
  ssr: false,
  target: 'static',
  modules: [
    '@nuxtjs/firebase'
  ],
  buildModules: [
    '@nuxtjs/vuetify'
  ],
  firebase: {
    config: {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: ""
    },
    services: {
      database: true,
      auth: {
        initialize: {
          onAuthStateChangedMutation: 'auth/SET_USER'
        }
      }
    }
  }
}