<template>
  <div
    :id="id"
    :ref="type + '-' + index"
    :style="style"
    :class="['mapspan', type, status]"
    @mouseover="highlight"
    @mouseleave="unhighlight"
    @click.prevent.stop="toggleChest"
    @contextmenu.prevent.stop="toggleChest"
  >
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DungeonPOI',
  props: {
    id: {
      type: [String, Number],
      default: -1
    },
    index: {
      type: Number,
      default: -1
    },
    image: {
      type: String,
      default: 'url(/assets/map/highlighted.png)'
    },
    color: {
      type: String,
      default: 'black'
    },
    left: {
      type: String,
      default: '0%'
    },
    top: {
      type: String,
      default: '0%'
    },
    type: {
      type: String,
      default: 'dungeon'
    },
    status: {
      type: String,
      default: 'available'
    }
  },
  data () {
    return {
      style: {
        'background-image': this.image,
        color: this.color,
        left: this.left,
        top: this.top,
        type: this.type
      }
    }
  },
  computed: {
    isAvailable () {
      return this.dungeons[this.id.substring(7)].canGetChest()[this.trackerOptions.mapLogic]
    },
    chests () {
      return this.worldData.chests
    },
    dungeons () {
      return this.worldData.dungeons
    },
    ...mapState(['trackerData', 'trackerOptions', 'worldData'])
  },
  watch: {
    isAvailable (newVal, oldVal) {
      console.log('Changed Dungeon Watcher! was: ', oldVal, ' is: ', newVal)
    }
  },
  methods:
  {
    // Event of clicking a chest on the map
    toggleChest (x) {
      // const me = this.$refs[this.type + '-' + this.index].classList
      // me.contains('opened') ? me.remove('opened') : me.add('opened')
      // rootRef.child('chestsopened').child(x).set(!trackerData.chestsopened[x])
    },
    // Highlights a chest location and shows the name as caption
    highlight (x) {
      // handle highlight for dungeons here
      this.$refs[this.type + '-' + this.index].style.backgroundImage = 'url(/assets/map/highlighted.png)'
      // document.getElementById('caption').innerHTML = chests[x].name
    },
    unhighlight (x) {
      // handle highlight for dungeons here
      this.$refs[this.type + '-' + this.index].style.backgroundImage = 'url(/assets/map/poi.png)'

      // document.getElementById('caption').innerHTML = '&nbsp;';
    }
  }
}
</script>

<style scoped>
.chest {
  width: 24px;
  height: 24px;
  background-size: 100% 100%;

  position: absolute;
  margin-left: -12px;
  margin-top: -12px;
}

.dungeon {
  width: 48px;
  height: 48px;
  background-size: 100% 100%;

  position: absolute;
  margin-left: -24px;
  margin-top: -24px;
}

.unavailable {
  background-color: rgb(255, 0, 0);
}

.available {
  background-color: rgb(0, 255, 0);
  color: rgb(0, 0, 0);
}

.possible {
  background-color: rgb(255, 255, 0);
  color: rgb(0, 0, 0);
}

.agahnim {
  background-color: rgb(0, 255, 255);
  color: rgb(0, 0, 0);
}

.glitchavailable {
  background-color: rgb(0, 127, 0);
}

.glitchpossible {
  background-color: rgb(192, 192, 0);
}

.glitchagahnim {
  background-color: rgb(0, 160, 160);
}

.opened {
  background-color: rgb(127, 127, 127);
}

.boss {
  width: 24px;
  height: 24px;

  background: no-repeat center;
  background-size: 75% 75%;

  position: absolute;
  margin-left: -12px;
  margin-top: -12px;

  z-index: 2;
}
</style>
