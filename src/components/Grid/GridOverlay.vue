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
                    v-if="outerGrid[(rowIndex * 22) + cellIndex]">
                    {{outerGrid[(rowIndex * 22) + cellIndex]}}
                </p>
                <p
                    v-else-if="innerGrid[(rowIndex * 22) + cellIndex]"
                    class="InnerGrid"
                    draggable="true"
                    @dragstart="setCurrentStat((rowIndex * 22) + cellIndex)"
                    @dragend="removeCurrentStat"
                    @dragover.prevent="changeColor"
                    @dragleave="changeColor"
                    @drop="switchStats((rowIndex * 22) + cellIndex)">
                    {{innerGrid[(rowIndex * 22) + cellIndex]}}&#x25B8;
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations} from 'vuex';
export default {
    name: "Grid",
    data(){
        return {
            rows: [...new Array(20)].map((x, i) => i),
            cells: [...new Array(22)].map((x, i) => i)
        }
    },
    methods: {
        ...mapActions(['switchStats']),
        ...mapMutations(['removeCurrentStat', 'setCurrentStat']),
        changeColor(e){
            let dragover = e.type === 'dragover';
            e.currentTarget.style.color = dragover ? "white" : "#22FF22";
        },
        // switchStats(){
        // },
    },
    computed: {
        ...mapGetters(['statPositions']),
        outerGrid(){
            return this.statPositions.outerGrid;
        },
        innerGrid(){
            return this.statPositions.innerGrid
        }
    }
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

    .InnerGrid {
        cursor: pointer;
    }


    @for $i from 1 through 22 {
        //colors in diagonal lines across the grid
        @if($i >= 1 and $i <= 10){
            //top-left diagonal
            .LegionRowOverlay:nth-of-type(#{$i}) > div {
                &:nth-of-type(#{$i}){
                        border-top: $innerQuadrant;
                        border-right: $innerQuadrant;
                }
            }
            //top-right diagonal
            .LegionRowOverlay:nth-of-type(#{11 - $i}) > div {
                &:nth-of-type(#{12 + $i}) {
                        border-top: $innerQuadrant;
                        border-left: $innerQuadrant;
                }
            }
            //bottom-left diagonal
            .LegionRowOverlay:nth-of-type(#{21 - $i}) > div {
                &:nth-of-type(#{$i}){
                        border-bottom: $innerQuadrant;
                        border-right: $innerQuadrant;
                }
            }
            //bottom-right diagonal
            .LegionRowOverlay:nth-of-type(#{21 - $i}) > div {
                &:nth-of-type(#{23 - $i}){
                        border-bottom: $innerQuadrant;
                        border-left: $innerQuadrant;
                }
            }
        }

        // divides grid in half vertically 
        @if($i < 21){
            .LegionRowOverlay:nth-of-type(#{$i}) > div {
                &:nth-of-type(11){
                    border-right: $outerQuadrant;
                }
                &:nth-of-type(12){
                    border-left: $outerQuadrant;
                }
            }
        }
        // divides grid in half horizontally
        .LegionRowOverlay:nth-of-type(10) > div {
            &:nth-of-type(#{$i}){
                border-bottom: $outerQuadrant;
            }
        }
        .LegionRowOverlay:nth-of-type(11) > div {
            &:nth-of-type(#{$i}){
                border-top: $outerQuadrant;
            }
        }
        //outlines inner quadrant of grid
        @if($i >= 6 and $i <= 17){
            // outlines the top and bottom sides of the inner quadrant
            .LegionRowOverlay:nth-of-type(6){
                > div:nth-of-type(#{$i}){
                    border-top: $innerQuadrant;
                }
            }
            .LegionRowOverlay:nth-of-type(15) {
                > div:nth-of-type(#{$i}){
                    border-bottom: $innerQuadrant;
                }
            }
            // outlines the left and right sides of the inner quadrant
            @if($i <= 15){
                .LegionRowOverlay:nth-of-type(#{$i}){
                    > div:nth-of-type(6){
                        border-left: $innerQuadrant;
                    }
                }
                .LegionRowOverlay:nth-of-type(#{$i}) {
                    > div:nth-of-type(17){
                        border-right: $innerQuadrant;
                    }
                }
            }
        }
    }
</style>