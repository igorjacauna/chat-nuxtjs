<template>
  <v-container>
    <v-row no-gutters>
      <v-text-field v-model.trim="chatName" hide-details outlined class="mr-2"></v-text-field>
      <v-btn color="primary" x-large :disabled="chatName === ''" @click="newChat">Novo chat</v-btn>
    </v-row>
    <v-row>
     <v-col>
       <v-card>
         <v-list>
          <v-list-item v-for="(chat, index) of chats" :key="index" :to="`/chat/${chat.id}`">
            <v-list-item-content>
              {{ chat.name }}
            </v-list-item-content>
          </v-list-item>
         </v-list>
       </v-card>
     </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  middleware: 'auth',
  fetch() {
    const chats = this.$fire.database.ref('chats')
    chats.on('child_added', snapshot => {
      this.chats.push({
        id: snapshot.key,
        ...snapshot.val()
      })
    })
    this.$on('hook:beforeDestroy', () => {
      chats.off()
    })
  },
  data() {
    return {
      chats: [],
      chatName: ''
    }
  },
  methods: {
    newChat() {
      const ref = this.$fire.database.ref('chats').push()
      ref.set({
        name: this.chatName
      })
      this.chatName = ''
    }
  }
}
</script>