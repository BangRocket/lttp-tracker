import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

import { mapState } from 'vuex'
import { rtdbPlugin } from 'vuefire'
// import { store } from '../store/store.js'
import {
  itemsInit,
  dungeonchestsInit,
  bigkeyInit,
  smallkeyInit,
  dungeonbeatenInit,
  prizesInit,
  medallionsInit,
  chestsopenedInit
} from '../script/items.js'

Vue.use(rtdbPlugin)

let authAttempted = false

// eslint-disable-next-line import/no-mutable-exports
// export let room = {}

export const db = {
  data () {
    return {
      room: {}
    }
  },
  methods: {
    destroyRoom () {
      this.room = {}
      this.isRoomLoaded = false
    },
    initRoom (id) {
      const roomid = String(id).replace(/\/$/, '').split('/').pop().toLowerCase()
      const temp = firebase.database().ref('games/' + roomid)
      this.room = temp
      // this.resetRoom()
      this.isRoomLoaded = true
    },
    resetRoom () {
      this.room.child('items').set(itemsInit)
      this.room.child('dungeonchests').set(dungeonchestsInit)
      this.room.child('bigkeys').set(bigkeyInit)
      this.room.child('smallkeys').set(smallkeyInit)
      this.room.child('dungeonbeaten').set(dungeonbeatenInit)
      this.room.child('prizes').set(prizesInit)
      this.room.child('medallions').set(medallionsInit)
      this.room.child('chestsopened').set(chestsopenedInit)
    },
    ...mapState(['trackerData', 'settings', 'isRoomLoaded', 'firebaseUID'])
  }
}

// Get a Firestore instance
if (!firebase.apps.length) {
  firebase
    .initializeApp({
      apiKey: 'AIzaSyC46wIQQopU18cIumNHtRSKXtxpXfukFnQ',
      databaseURL: 'https://jorsh-2fc49.firebaseio.com/'
    })
    .database()
}

// export function destroyRoom () {
//   room = {}
//   this.isRoomLoaded = false
// }

// export function initRoom (id) {
//   const roomid = String(id).replace(/\/$/, '').split('/').pop().toLowerCase()
//   room = firebase.database().ref('games/' + roomid)
//   // this.resetRoom()
//   this.isRoomLoaded = true
// }

// export function resetRoom () {
//   room.child('items').set(itemsInit)
//   room.child('dungeonchests').set(dungeonchestsInit)
//   room.child('bigkeys').set(bigkeyInit)
//   room.child('smallkeys').set(smallkeyInit)
//   room.child('dungeonbeaten').set(dungeonbeatenInit)
//   room.child('prizes').set(prizesInit)
//   room.child('medallions').set(medallionsInit)
//   room.child('chestsopened').set(chestsopenedInit)
// }

export function firebaseAuth (callback) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      // console.log(user.uid)
      this.firebaseUID = user.uid
      callback()
    } else {
      console.log('Auth state not logged in')
      if (authAttempted) {
        return
      }
      authAttempted = true
      firebase.auth().signInAnonymously().catch(function (error) {
        console.log(error)
      })
    }
  })
}
