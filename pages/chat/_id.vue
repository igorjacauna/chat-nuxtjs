<template>
  <v-container fill-height>
    <v-row>
      <v-col>
        <v-card>
          <v-toolbar color="primary" dark>
            <v-btn icon @click="$router.back()">
              <v-icon> mdi-chevron-left </v-icon>
            </v-btn>
          </v-toolbar>
          <v-list max-height="400px" min-height="400px">
            <v-list-item-group>
              <v-list-item v-for="(message, index) of messages" :key="index">
                <v-avatar color="secondary" size="32" class="mr-2">
                  <img :src="message.photo" v-if="message.photo" />
                  <span v-else>{{ message.author[0] }}</span>
                </v-avatar>
                <span>
                  <b>{{ message.author }}:</b> {{ message.message }}
                </span>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-divider> </v-divider>
          <form @submit.prevent="sendMessage">
            <v-card-actions class="pa-5">
              <v-row>
                <v-text-field
                  v-model.trim="message"
                  class="mr-2"
                  hide-details
                  outlined
                  full-width
                  placeholder="Digite sua mensagem"
                >
                </v-text-field>
                <v-btn
                  x-large
                  color="primary"
                  :disabled="message === ''"
                  type="submit"
                  >Enviar</v-btn
                >
              </v-row>
            </v-card-actions>
          </form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  middleware: "auth",
  fetch() {
    this.room = this.$fire.database.ref(
      `/chats/${this.$route.params.id}/messages`
    );
    this.room.on("child_added", (snapshot) => {
      this.messages.unshift(snapshot.val());
      this.message = "";
    });
    this.$on("hook:beforeDestroy", () => {
      this.room.off();
    });
  },
  data() {
    return {
      room: null,
      messages: [],
      message: "",
    };
  },
  methods: {
    sendMessage() {
      this.room.push({
        author: this.$store.state.auth.user.displayName,
        photo: this.$store.state.auth.user.photoURL,
        message: this.message,
      });
    },
  },
};
</script>