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
  name: 'ChestPOI',
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
      default: 'chest'
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
        'background-color': '',
        color: this.color,
        left: this.left,
        top: this.top,
        type: this.type
      }
    }
  },
  computed: {
    isAvailable () {
      console.log(this.type)
      if ((this.type) === 'boss') {
        return this.trackerData.dungeonbeaten[this.id.substring(7)]
      }

      if (this.type === 'dungeon') {
        // console.log(this.id.substring(7))
        return this.dungeons[this.id.substring(7)].isBeatable()[this.trackerOptions.mapLogic]
      }

      return this.chests[this.id].isAvailable()[this.trackerOptions.mapLogic]
    },
    openCount () {
      return this.trackerData.dungeonchests[this.id]
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
      console.log('Changed Chest Watcher! was: ', oldVal, ' is: ', newVal)
      // newVal <= 0 ? this.style['background-color'] = 'rgb(127, 127, 127)' : this.style['background-color'] = ''
    },
    openCount (newVal, oldVal) {
      console.log('Changed Chest Counter Watcher! was: ', oldVal, ' is: ', newVal)
      console.log(this)
      newVal <= 0 ? this.style['background-color'] = 'rgb(127, 127, 127)' : this.style['background-color'] = ''
    }
  },
  methods:
  {
    // Event of clicking a chest on the map
    toggleChest (x) {
      const me = this.$refs[this.type + '-' + this.index].classList
      me.contains('opened') ? me.remove('opened') : me.add('opened')
      // rootRef.child('chestsopened').child(x).set(!trackerData.chestsopened[x])
    },
    // Highlights a chest location and shows the name as caption
    highlight (x) {
      console.log(this.isAvailable)
      if (x.target.classList.contains('boss')) {
        // handle highlight for bosses here
        return
      }

      if (x.target.classList.contains('dungeon')) {
        // handle highlight for dungeons here
        this.$refs[this.type + '-' + this.index].style.backgroundImage = 'url(/assets/map/highlighted.png)'
        return
      }
      x.target.style.backgroundImage = 'url(/assets/map/highlighted.png)'
      // document.getElementById(x).style.backgroundImage = 'url(/assets/map/highlighted.png)';
      // document.getElementById('caption').innerHTML = chests[x].name
    },
    unhighlight (x) {
      if (x.target.classList.contains('boss')) {
        // handle highlight for bosses here
        return
      }

      if (x.target.classList.contains('dungeon')) {
        // handle highlight for dungeons here
        this.$refs[this.type + '-' + this.index].style.backgroundImage = 'url(/assets/map/poi.png)'
        return
      }
      x.target.style.backgroundImage = 'url(/assets/map/poi.png)'
      // document.getElementById(x).style.backgroundImage = 'url(/assets/map/poi.png)';
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
