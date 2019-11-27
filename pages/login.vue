<template>
  <div>
    <h2 class="text-center">
      Login
    </h2>
    <hr>
    <b-alert v-if="error" show variant="danger">
      {{ error + '' }}
    </b-alert>
    <b-alert v-if="$auth.$state.redirect" show>
      You have to login before accessing to <strong>{{ $auth.$state.redirect }}</strong>
    </b-alert>
    <b-row align-h="center pt-4">
      <b-col md="4">
        <b-card bg-variant="light">
          <busy-overlay />
          <form @keydown.enter="login">
            <b-form-group label="Username">
              <b-input ref="username" v-model="username" placeholder="anything" />
            </b-form-group>

            <b-form-group label="Password">
              <b-input v-model="password" type="password" placeholder="123" />
            </b-form-group>

            <div class="text-center">
              <b-btn variant="primary" block @click="login">
                Login
              </b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<style scoped>
.login-button {
  border: 0;
};
</style>

<script>

export default {
  middleware: ['auth'],
  components: { },
  data () {
    return {
      username: '',
      password: '123',
      error: null
    }
  },
  computed: {
    strategies: () => ([]),
    redirect () {
      return (
        this.$route.query.redirect &&
        decodeURIComponent(this.$route.query.redirect)
      )
    },
    isCallback () {
      return Boolean(this.$route.query.callback)
    }
  },
  methods: {
    login () {
      this.error = null

      return this.$auth
        .loginWith('local', {
          data: {
            username: this.username,
            password: this.password
          }
        })
        .catch((e) => {
          this.error = e + ''
        })
    }
  }
}
</script>
