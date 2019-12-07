<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-col>
      <span class="subtitle-2">
        {{ name }} {{ version }}
      </span>

      <span class="subtitle-2">
        &copy; {{ new Date().getFullYear() }}
      </span>

      <span class="subtitle-2">
        <v-btn
          :href="source"
          icon
          small
          target="_blank"
        >
          <v-icon small>
            mdi-code-tags
          </v-icon>
        </v-btn>
      </span>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CopyrightFooter',
  data () {
    return {
      version: '1.0.0',
      author: 'Joshua Heidorn',
      name: 'JoRsH Tracker',
      source: 'https://github.com/BangRocket/lttp-tracker'
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
