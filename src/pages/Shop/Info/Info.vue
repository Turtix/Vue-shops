<template>
    <div>
      Info
      <!--{{info}}-->
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'Info',
    computed: {
      ...mapState(['info'])
    }
  }
</script>

<style scoped>

</style>
