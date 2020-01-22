<template>
    <div id="LegionGrid"
        assigning="true">
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
                :archetypeList="''"
                @dragover.prevent="highlightCells"
                @dragleave="highlightCells"
                @drop="insertPiece(rowIndex, cellIndex, $event)">
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
import characterCardMixin from '../../mixins/characterCardMixin';

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
    mixins: [characterCardMixin],
    methods:{
        ...mapActions(['insertIntoPreset']),
        highlightCells(e){
            let dragover = (e.type === 'dragover');
            if(this.currentCharacter && e.target.nodeName !== "IMG"){
                let {coordinates} = this.currentCharacter;
                let {row, cell} = e.target.attributes;
                let legionrow = [...document.getElementsByClassName('LegionRow')];
                row = parseInt(row.value);
                cell = parseInt(cell.value);
                if(dragover){
                    legionrow[row].children[cell].setAttribute('highlighted', true);
                }
                else {
                    legionrow[row].children[cell].removeAttribute('highlighted');
                }
                coordinates.forEach(coord => {
                    let {x, y} = coord;
                    x += cell;
                    y += row;
                    if( y >= 0 && y < 20 &&
                        x >= 0 && x < 22){
                            if(dragover){
                                legionrow[y].children[x].setAttribute('highlighted', true);
                            }
                            else {
                                legionrow[y].children[x].removeAttribute('highlighted');
                            }
                    }
                })
            }
        },
        insertPiece(row, cell, e){
            let position = (row * 22) + cell;
            this.insertIntoPreset(position);
            let legioncell = [...document.getElementsByClassName('LegionCell')];
            legioncell.forEach(cell => {
                cell.removeAttribute('highlighted')
            })
            this.unhighlightCard(this, this.currentCharacter.className);
        }
    },
    computed: mapGetters(['currentCharacter', 'currentPreset'])
}
</script>

<style scoped lang="scss">
    @import '../../variables.scss';
    @import '../../mixins.scss';

    #LegionGrid {
        @include grid-layout;
        &[assigning="true"]{
            background: none;
        }
    }

    .LegionRow {
        display: flex;
        justify-content: center;
    }

    .LegionCell{
        @include cell-layout;
        @include archetype-colors;
        &[archetype="Overlap"]{ 
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px white solid;
            background: {
                image: url('../../assets/Overlap.svg');
                size: cover;
            }
        }
        &[highlighted="true"]{ border: 3px dashed yellow; }
    }

    @include tablet-grid-size (
        '#LegionGrid',
        '.LegionCell'
    )




</style>