<template>
  <span>
    <nuxt-link
      to="login"
    >
      Login
    </nuxt-link>
    <NuxtChild :key="$route" />
  </span>
</template>

<script>

export default {
  name: 'LandingPage',
  components: {
  },
  props: {
  },
  data: () => ({
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
