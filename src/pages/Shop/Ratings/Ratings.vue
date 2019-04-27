<template>
    <div>
      Ratings
      <!--{{ratings}}-->
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'Ratings',
    computed: {
      ...mapState(['ratings'])
    }
  }
</script>

<style scoped>

</style>
