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
                @click="insertPiece(rowIndex, cellIndex)"
                @mouseover="highlightCells"
                @mouseout="highlightCells">
                    <!-- <GridPiece 
                        v-if="((currentPreset || {})['characters'] || {})[rowIndex * 22 + cellIndex]" 
                        :charInfo="currentPreset['characters'][rowIndex * 22 + cellIndex]"
                        :position="{rowIndex, cellIndex}"/> -->
                    <GridPiece 
                        v-if="(currentPreset || {})[rowIndex * 22 + cellIndex]" 
                        :charInfo="currentPreset[rowIndex * 22 + cellIndex]"
                        :position="{rowIndex, cellIndex}"/>
            </div>
        </div>
    </div>
</template>

<script>
import GridPiece from './GridPiece';
import { mapActions, mapGetters } from 'vuex';
export default {
    name: "Grid",
    components: {
        GridPiece
    },
    data(){
        return {
            rows: [...new Array(20)].map((x, i) => i),
            cells: [...new Array(22)].map((x, i) => i)
        }
    },
    methods:{
        ...mapActions(['updatePreset']),
        highlightCells(e){
            let mouseover = e.type === 'mouseover' ? true : false;
            if(this.currentCharacter && e.target.nodeName !== "IMG"){
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
        },
        insertPiece(row, cell){
            let position = (row * 22) + cell;
            this.updatePreset(position);
        }
    },
    computed: mapGetters(['currentCharacter', 'currentPreset'])
}
</script>

<style scoped lang="scss">
    @import '../../variables.scss';

    #LegionGrid {
        max-height: $size * 20;
        max-width: $size * 22;
        display: flex;
        flex-direction: column;
        margin-top: 3px;   
        background-color: rgba(21, 21, 21, 1);     
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
        border-radius: 3.5px;
        &[archetype="Warrior"]{ 
            background-color: $warrior;
            border: 1px solid white;
        }
        &[archetype="Magician"]{ 
            background-color: $magician; 
            border: 1px solid white;
        }
        &[archetype="Bowman"]{ 
            background-color: $bowman; 
            border: 1px solid white;
        }
        &[archetype="Thief"]{ 
            background-color: $thief; 
            border: 1px solid white;
        }
        &[archetype="Pirate"]{ 
            background-color: $pirate; 
            border: 1px solid white;
        }
        &[archetype="Overlap"]{ 
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid white;
            background: magenta;
            &::after {
                content: "O";
                color: white;
            }
        }
    }


</style>