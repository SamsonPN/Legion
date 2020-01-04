<template>
    <div id="LegionGrid">
        <div 
            class="LegionRow"
            v-for="(row, rowIndex) in rows"
            :key="rowIndex"
            :rowIndex="rowIndex">
            <div 
                class="LegionCell"
                v-for="(cell, cellIndex) in cells"
                :key="cellIndex"
                :row="rowIndex"
                :cell="cellIndex"
                @mouseover="highlightCells"
                @mouseout="highlightCells">
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: "Grid",
    data(){
        return {
            rows: [...new Array(20)].map((x, i) => i),
            cells: [...new Array(22)].map((x, i) => i)
        }
    },
    methods:{
        highlightCells(e){
            let mouseover = e.type === 'mouseover' ? true : false;
            if(this.currentCharacter){
                let {coordinates} = this.currentCharacter;
                let {row, cell} = e.target.attributes;
                let legionrow = [...document.getElementsByClassName('LegionRow')];
                row = parseInt(row.value);
                cell = parseInt(cell.value);
                legionrow[row].children[cell].style.cssText = mouseover ? 'border: 3px solid yellow' : 'border: 1px solid #FF22FF';
                coordinates.forEach(coord => {
                    let {x, y} = coord;
                    x += cell;
                    y += row;
                    if( y >= 0 && y < 20 &&
                        x >= 0 && x < 22){
                            legionrow[y].children[x].style.cssText = mouseover ? 'border: 3px solid yellow' : 'border: 1px solid #FF22FF';
                    }
                })
            }
        }
    },
    computed: mapGetters(['currentCharacter'])
}
</script>

<style scoped lang="scss">
    $size: 30px;

    #LegionGrid {
        max-height: $size * 20;
        max-width: $size * 22;
        display: flex;
        flex-direction: column;
        margin-top: 3px;   
        background-color: rgba(21, 21, 21, 1);     
        opacity: 0.95;
        z-index: 0;
    }

    .LegionRow {
        display: flex;
        justify-content: center;
    }

    .LegionCell{
        display: flex;
        width: $size;
        height: $size;
        border: 1px solid #FF22FF;
        // position: relative;
        border-radius: 3.5px;
    }


</style>