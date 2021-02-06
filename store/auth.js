export const state = () => ({
  user: null
})

export const mutations = {
  SET_USER(state, { authUser }) {
    if (authUser) {
      const { displayName, photoURL } = authUser
      state.user = {
        displayName,
        photoURL
      }
    } else {
      state.user = null
    }
  }
}