<template>
  <div>
    <div
      v-if="!isRoomLoaded"
      id="createRoomPanel"
    >
      <p>Either the room is still loading or there is not a room here.</p>
      <p>Click the button below to initialize a room.</p>
      <p>Be sure to give it a passcode so you can give access to others or yourself on another machine or after a cookie reset.</p>
      <p>
        Room Editing Passcode: <input
          id="passcodeInput"
          type="text"
          name="passcode"
        />
      </p>
      <p>
        <button
          id="initRoomButton"
          type="button"
          name="initRoom"
          @click="createRoom"
        >
          Create Room
        </button>
      </p>
    </div>

    <div
      id="caption"
      width="100%"
    >
      &nbsp;
    </div>
    <div id="layoutdiv">
      <div
        id="itemdiv"
        class="itemdiv"
      >
        <ItemTable v-if="isRoomLoaded"></ItemTable>
      </div>
      <LocationMap v-if="!showMap && isRoomLoaded"></LocationMap>
    </div>

    <!--<footer style='bottom:0; width:100%; text-align: center; position: absolute; color:grey'>Lttp Networked Rando Tracker -
            @pickfifteen (Based on crossproduct, SRL, marcmagus)
        </footer> -->
  </div>
</template>

<script>
// import ItemTable from '../components/ItemTable.vue'
// import LocationMap from '../components/LocationMap.vue'

// import { mapState } from 'vuex'
// import { store } from '../store/store.js'
// import { initRoom, room } from '../db/db.js'

export default {
  components: {
    // ItemTable,
    // LocationMap
  },
  data () {
    return {
      settingsVisible: false,
      showMap: false,
      roomID: this.$route.params.id
    }
  },
  computed: {
    // ...mapState(['trackerData', 'trackerOptions', 'firebaseUID', 'isRoomLoaded'])
  },
  // mounted: async function () {
  // initRoom(this.roomID)
  // var check = await room.child('owner').once('value')
  // var hasData = !(check.val() === null)
  // // check localstorage for pw, if not, request it
  // store.commit('setData', { key: 'isRoomLoaded', value: hasData })
  // },
  methods: {
    createRoom () {
    //   var editors = {}
    //   var passcode = document.getElementById('passcodeInput').value
    //   editors[this.firebaseUID] = true
    //   room.set({
    //     owner: this.firebaseUID,
    //     editors: editors,
    //     passcode: passcode,
    //     items: this.trackerData.items,
    //     dungeonchests: this.trackerData.dungeonchests,
    //     bigkeys: this.trackerData.bigkeys,
    //     smallkeys: this.trackerData.smallkeys,
    //     dungeonbeaten: this.trackerData.dungeonbeaten,
    //     prizes: this.trackerData.prizes,
    //     medallions: this.trackerData.medallions,
    //     chestsopened: this.trackerData.medallions
    //   })
    //   store.commit('setData', { key: 'isRoomLoaded', value: true })
    },
    editMode () { },
    showChest () { },
    showCrystal () { },
    showMedallion () { },
    showBigKeys () { },
    showSmallKeys () { },
    showLabel () { },
    showTracker () {
      this.showMap = !this.showMap
    }
  }
}
</script>

<style>
body {
  background-color: rgb(0, 0, 0);
  margin: 0;
  color: white;
}

a {
  color: rgb(128, 128, 255);
}

#legend {
  float: right;
}

.flexcontainer {
  display: flex;
}

.settings {
  background-color: rgb(0, 0, 0);
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 10;
  max-height: 100vh;
  overflow-y: auto;
}

#settingsbutton {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 11;
  background-color: rgb(0, 0, 0);
  color: red;
}

.tracker {
  background-color: rgb(0, 0, 0);
  position: relative;
  left: 0;
  top: 0;
  empty-cells: show;
  border-spacing: 0;
  border: 0;
}

.tracker td {
  width: 64px;
  height: 64px;
  padding: 0;
  background-repeat: no-repeat;
}

.tracker .halfcell {
  width: 32px;
  height: 64px;
}

.itemconfig {
  border-spacing: 0;
  border: 1px solid white;
}

* {
  box-sizing: border-box;
}

.stoops {
  width: 128px;
  height: 128px;
  background-size: 200% 200%;
}

input {
  margin-top: 5px;
  margin-bottom: 5px;
  display: inline-block;
  *display: inline; /* for IE7*/
  zoom: 1; /* for IE7*/
  vertical-align: middle;
  margin-left: 20px;
}

label {
  display: inline-block;
  *display: inline; /* for IE7*/
  zoom: 1; /* for IE7*/
  /* float: left; */
  padding-top: 5px;
  text-align: right;
  width: 140px;
}

.lonk {
  width: 64px;
  height: 64px;
  border-spacing: 0;
  border: 0;
}

.corner {
  width: 32px;
  height: 32px;
  color: lightgray;
  font: 26px "VT323", monospace;
  cursor: default;
  text-shadow: 0 0 3px black;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.editcell {
  font-size: 20px;
}

.textCounter {
  display: block;
  position: absolute;
  right: 0;
  bottom: 0;
  font: 40px "VT323", monospace;
  cursor: default;
  color: #fdd549;
  user-select: none;
  text-shadow: -2px -2px 1px black;
}

.mini {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

.itemdiv {
  position: relative;
  left: 0;
}

.mapdiv {
  background-size: 100% 100%;
  background: url("/assets/map.png") no-repeat;

  position: relative;
  width: 884px;
  height: 442px;
  left: 0;
}

.mapvdiv {
  background-size: cover;
  background: url("/assets/mapv.png") no-repeat;

  position: relative;
  width: 438px;
  height: 888px;
  left: 0;
}
</style>
