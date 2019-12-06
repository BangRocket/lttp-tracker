<template>
  <div>
    Logic Checker 0.0.1
    <br />
    <itemTable :column-list="test"></itemTable>
  </div>
</template>

<script>
import itemTable from '../components/itemTable.vue'

export default {
  name: 'LogicHome',
  components: {
    itemTable
  },
  data () {
    return {
      test: JSON.stringify([
        {
          id: 'id',
          name: 'ID',
          width: '30px'
        },
        {
          id: 'name',
          name: 'Name',
          width: '200px'
        },
        {
          id: 'reqs',
          name: 'Requirements',
          width: '200px'
        },
        {
          id: 'opened',
          name: 'Opened',
          width: '200px'
        },
        {
          id: 'available',
          name: 'Available',
          width: '200px'
        },
        {
          id: 'button',
          name: '',
          width: '50px'
        }
      ])
    }
  }
}
</script>

<style>
* {
  background-color: rgb(0, 0, 0);
  color: white;
}
a {
  color: rgb(128, 128, 255);
}
table, th, td {
  border: 1px solid white;
}
</style>
