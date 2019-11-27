<template>
  <div class="hello">
    <h1>LttP Networked Item Tracker</h1>
    <li>
      <nuxt-link :to="{ name: 'tracker', params: { id: 123 }}">
        <h1>test</h1>
      </nuxt-link>
    </li>

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
</template>

<script>
export default {
  name: 'LandingPage'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
* {
  box-sizing: border-box;
}
.hello {
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
</style>
