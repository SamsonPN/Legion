<template>
  <tr>
      <GridCells v-for="(cell, index) in cells" :key="index" :cell="index" />
  </tr>
</template>

<script>
import GridCells from './GridCells';

export default {
    name: "GridRow",
    props: ['row'],
    components: {
        GridCells
    },
    data(){
        return {
            cells: [...new Array(22)].map((element, index) => index)
        }
    },
    methods: {
    }
}
</script>

<style scoped lang="scss">
</style>