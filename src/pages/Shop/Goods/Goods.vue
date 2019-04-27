<template>
    <div>
      Goods
      <!--{{goods}}-->
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'Goods',
    computed: {
      ...mapState(['goods'])
    }
  }
</script>

<style scoped>

</style>
