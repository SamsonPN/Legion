<template>
  <div
    id="GridMini">
      <div
        class="GridMiniRow"
        v-for="(row, rowIndex) in rows"
        :key="rowIndex">
        <div
            class="GridMiniCell"
            v-for="(cell, cellIndex) in cells"
            :key="cellIndex">
            <p
                v-if="outerGrid[ position(rowIndex, cellIndex) ]">
                {{outerGrid[ position(rowIndex, cellIndex) ]}}
            </p>
            <p
                v-else-if="innerGrid[ position(rowIndex, cellIndex) ]"
                class="innerGrid">
                {{innerGrid[ position(rowIndex, cellIndex) ]}}&#x25B8;
            </p>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'GridMini',
    data(){
        return {
            rows: [...new Array(20)].map((x, i) => i),
            cells: [...new Array(22)].map((x, i) => i)
        }
    },
    computed: {
        ...mapGetters(['statPositions']),
        outerGrid(){
            return this.statPositions.outerGrid || {};
        },
        innerGrid(){
            return this.statPositions.innerGrid || {};
        }
    }
}
</script>

<style scoped lang="scss">

</style>