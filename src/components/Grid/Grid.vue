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
                @dragover.prevent="dragOver"
                @dragenter="dragEnter"
                @dragleave="dragLeave"
                @drop="dragDrop">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Grid",
    data(){
        return {
            rows: [...new Array(20)].map((x, i) => i),
            cells: [...new Array(22)].map((x, i) => i)
        }
    },
    methods:{
        dragOver(){
        },
        dragEnter(e){
            e.currentTarget.style.border = '3px solid yellow';          
        },
        dragLeave(e){
            e.currentTarget.style.border = '1px solid #FF22FF';
        },
        dragDrop(e){
            let charInfo = JSON.parse(e.dataTransfer.getData("text"));
            let piece = document.getElementById(charInfo.id);
            let mainPiece = piece.children[2].children[2];
            let copy = piece.cloneNode(true);
            e.currentTarget.appendChild(copy);
            e.currentTarget.style.border = '1px solid #FF22FF';
            let {row, cell} = e.currentTarget.attributes;
            let legionrow = [...document.getElementsByClassName('LegionRow')];
            charInfo.coordinates.forEach(coordinate => {
                let {x, y} = coordinate;
                x += parseInt(cell.value);
                y += parseInt(row.value);
                if( y >= 0 && y < 20 && 
                    x >= 0 && x < 22 ){
                        legionrow[y].children[x].style.cssText = "background-color: red; border: 1px solid white;";
                }
            })
            e.dataTransfer.clearData();
        }
    }
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