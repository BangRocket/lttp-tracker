<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>account_box</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>add_box</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Create New Tracker</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>view_list</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>List Trackers</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-map</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Tracker</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>layers</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Areas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ appTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>account_box</v-icon>
      </v-btn>
      <!-- <v-btn icon>
        <v-icon>mdi-settings</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <div class="hello">
          <h1>LttP Networked Item Tracker</h1>

          <nuxt-link :to="{ name: 'tracker', params: { id: 123 }}">
            <h1>test</h1>
          </nuxt-link>

          <hr>

          <p style="font-size: 1.4em;">
            Go to <span id="loc"></span>/[NAME] to view a tracker. If the name does not
            already exist, you will be able to create the tracker. If it does exist, you will be able to watch the
            tracker and, if the room creator gives you the passcode, update the tracker as well.
          </p>
          <p>
            If you have been given a passcode, you can enter it in the "Settings" panel by clicking the button in the
            lower-right hand side. There is no indication when you've entered the correct passcode, but you'll be
            able to update the tracker successfully if you did.
          </p>
          <p>
            Remember the passcode when you create a tracker. If your cookies clear, you will not be able to update
            the tracker without putting in the passcode.
          </p>
          <p>
            If you prefer a simpler version of the tracker, you can access one at <span id="loc2"></span>/simple/[NAME]
            that does not have map or chest tracking but does have a timer.
          </p>
        </div>
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="shrink">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  :href="source"
                  icon
                  large
                  target="_blank"
                  v-on="on"
                >
                  <v-icon large>
                    mdi-code-tags
                  </v-icon>
                </v-btn>
              </template>
              <span>Source</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <v-spacer></v-spacer>
      <CopyrightFooter></CopyrightFooter>
    </v-footer>
  </v-app>
</template>

<script>
import CopyrightFooter from '../components/CopyrightFooter.vue'

export default {
  name: 'LandingPage',
  components: {
    CopyrightFooter
  },
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    appTitle: 'JoRsH Tracker'
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
