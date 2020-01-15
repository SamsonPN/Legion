<template>
    <div id="LegionGridOverlay">
        <div 
            class="LegionRowOverlay"
            v-for="(row, rowIndex) in rows"
            :key="rowIndex"
            :rowIndex="rowIndex">
            <div 
                class="LegionCellOverlay"
                v-for="(cell, cellIndex) in cells"
                :key="cellIndex"
                :row="rowIndex"
                :cell="cellIndex">
                <p
                    v-if="statPositions[(rowIndex * 22) + cellIndex]">
                    {{statPositions[(rowIndex * 22) + cellIndex]}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    name: "Grid",
    components: {
    },
    data(){
        return {
            rows: [...new Array(20)].map((x, i) => i),
            cells: [...new Array(22)].map((x, i) => i)
        }
    },
    computed: mapGetters(['statPositions'])
}
</script>

<style scoped lang="scss">
    @import '../../variables.scss';

    #LegionGridOverlay {
        position: absolute;
        max-height: $size * 20;
        max-width: $size * 22;
        display: flex;
        flex-direction: column;
        margin-top: 3px;   
        background-color: rgba(21, 21, 21, 1);
        z-index: -1; 
    }

    .LegionRowOverlay {
        display: flex;
        justify-content: center;
    }

    .LegionCellOverlay {
        position: relative;
        display: flex;
        width: $size;
        height: $size;
        border: 0.5px solid $grid;
        border-radius: 3.5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    p{
        width: auto;
        position: absolute;
        z-index: 10;
        text-align: center;
        font: {
            size: 1em;
            weight: 900;
        }
        color: #22FF22;
        background-color: rgba(0, 0, 0, 0.75);
    }

    // outlines the top and bottom sides of the inner quadrant
    @for $column from 6 through 17{
        .LegionRowOverlay:nth-of-type(6){
            > div:nth-of-type(#{$column}){
                border-top: $innerQuadrant;
            }
        }
        .LegionRowOverlay:nth-of-type(15) {
            > div:nth-of-type(#{$column}){
                border-bottom: $innerQuadrant;
            }
        }
    }

    // outlines the left and right sides of the inner quadrant
    @for $row from 6 through 15 {
        .LegionRowOverlay:nth-of-type(#{$row}){
            > div:nth-of-type(6){
                border-left: $innerQuadrant;
            }
        }
        .LegionRowOverlay:nth-of-type(#{$row}) {
            > div:nth-of-type(17){
                border-right: $innerQuadrant;
            }
        }
    }

    // divides grid in half vertically
    @for $row from 1 through 20 {
        .LegionRowOverlay:nth-of-type(#{$row}) > div {
            &:nth-of-type(11){
                border-right: $outerQuadrant;
            }
            &:nth-of-type(12){
                border-left: $outerQuadrant;
            }
        }
    }

    // divides grid in half horizontally
    @for $column from 1 through 22 {
        .LegionRowOverlay:nth-of-type(10) > div {
            &:nth-of-type(#{$column}){
                border-bottom: $outerQuadrant;
            }
        }
        .LegionRowOverlay:nth-of-type(11) > div {
            &:nth-of-type(#{$column}){
                border-top: $outerQuadrant;
            }
        }
    }

    // colors in diagonal lines across the grid
    @for $i from 1 through 10 {
        .LegionRowOverlay:nth-of-type(#{$i}) > div {
            &:nth-of-type(#{$i}){
                    border-top: $innerQuadrant;
                    border-right: $innerQuadrant;
            }
        }

        .LegionRowOverlay:nth-of-type(#{11 - $i}) > div {
            &:nth-of-type(#{12 + $i}) {
                    border-top: $innerQuadrant;
                    border-left: $innerQuadrant;
            }
        }

        .LegionRowOverlay:nth-of-type(#{21 - $i}) > div {
            &:nth-of-type(#{$i}){
                    border-bottom: $innerQuadrant;
                    border-right: $innerQuadrant;
            }
        }

        .LegionRowOverlay:nth-of-type(#{21 - $i}) > div {
            &:nth-of-type(#{23 - $i}){
                    border-bottom: $innerQuadrant;
                    border-left: $innerQuadrant;
            }
        }

    }
</style>