<template>
    <div>
        <img
            :id="charInfo.className + 'Image'"
            @click="scrollToCard"
            @mouseover="highlightPiece"
            @mouseleave="highlightPiece"
            ref="GridPieceImg" 
            src=""
            alt="GP">
        <!-- <ul ref="GridMenu">
            <li>Move</li>
            <li>Delete</li>
        </ul> -->
    </div>
</template>

<script>
import { mapGetters, mapMutations} from 'vuex';
export default {
    name: "GridPiece",
    props: ['charInfo', 'position'],
    methods: {
        // dragStart(e){
        //     console.log(this.charInfo.className);
        //     let piece = document.getElementById(this.charInfo.className + 'Piece');
        //     e.dataTransfer.setDragImage(piece, 80, 80);
        // },
        ...mapMutations(['setCurrentCharacter']),
        fillCoordinateColors(style){
            let {rowIndex, cellIndex} = this.position;
            let position = (rowIndex * 22) + cellIndex;
            let {className, coordinates, archetype} = this.currentPreset[position];
            let legionrow = [...document.getElementsByClassName('LegionRow')]; 
            coordinates.forEach(coord => {
                let {x, y} = coord;
                x += cellIndex;
                y += rowIndex;
                if( y >= 0 && y < 20 &&
                    x >= 0 && x < 22){
                        legionrow[y].children[x].style.cssText = style;
                }
            }) 
        },
        getImage(charName){
            if(charName === 'Archmage Fire/Poison'){
                charName = 'FP';
            }
            else if (charName === 'Archmage Ice/Lightning'){
                charName = 'IL';
            }
            return require(`../../assets/ClassIcons/${charName}.png`);
        },
        highlightPiece(e){
            let {rowIndex, cellIndex} = this.position;
            let position = (rowIndex * 22) + cellIndex;
            let {className, coordinates, archetype} = this.currentPreset[position];
            let mouseover = (e.type === 'mouseover');
            let legionrow = [...document.getElementsByClassName('LegionRow')]; 
            if(mouseover){
                legionrow[rowIndex].children[cellIndex].setAttribute('highlighted', true);
            }
            else {
                legionrow[rowIndex].children[cellIndex].removeAttribute('highlighted');
            }
            coordinates.forEach(coord => {
                let {x, y} = coord;
                x += cellIndex;
                y += rowIndex;
                if( y >= 0 && y < 20 &&
                    x >= 0 && x < 22){
                        if(mouseover){
                            legionrow[y].children[x].setAttribute('highlighted', true);
                        }
                        else {
                            legionrow[y].children[x].removeAttribute('highlighted');
                        }
                }
            }) 

        },
        scrollToCard(e){
            e.stopPropagation();
            let {className} = this.charInfo;
            document.getElementById(className + 'Card').scrollIntoView();
            document.getElementById(className + 'Piece').click();
            let currentChar = {
                className,
                position: this.position
            };
            this.setCurrentCharacter(currentChar);

        }
    },
    mounted(){
        let {rowIndex, cellIndex} = this.position;
        let position = (rowIndex * 22) + cellIndex;
        let {className, coordinates, archetype} = this.currentPreset[position];
        let {GridPieceImg} = this.$refs; 
        let icon = this.getImage(className);
        GridPieceImg.src = icon;
        let legionrow = [...document.getElementsByClassName('LegionRow')]; 
        coordinates.forEach(coord => {
            let {x, y} = coord;
            x += cellIndex;
            y += rowIndex;
            if( y >= 0 && y < 20 &&
                x >= 0 && x < 22){
                    let attribute = legionrow[y].children[x].getAttribute('archetype');
                    let newArchetype = attribute ? 'Overlap' : archetype;
                    legionrow[y].children[x].setAttribute('archetype', newArchetype);
            }
        })
    },
    computed: mapGetters(['currentPreset']),
    updated(){
        let {rowIndex, cellIndex} = this.position;
        let position = (rowIndex * 22) + cellIndex;
        let {className, coordinates, archetype} = this.currentPreset[position];
        let legionrow = [...document.getElementsByClassName('LegionRow')]; 
        coordinates.forEach(coord => {
            let {x, y} = coord;
            x += cellIndex;
            y += rowIndex;
            if( y >= 0 && y < 20 &&
                x >= 0 && x < 22){
                    let attribute = legionrow[y].children[x].getAttribute('archetype');
                    let newArchetype = attribute ? 'Overlap' : archetype;
                    legionrow[y].children[x].setAttribute('archetype', newArchetype);
            }
        }) 
    }
}
</script>

<style scoped lang="scss">
    img{
        max-width: 100%;
        cursor: pointer;
    }

    ul{
        height: 75px;
        width: 75px;
        display: none;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        position: absolute;
        background-color: red;
        border-radius: 5px;
        > li {
            color: white;
            list-style: none;
            cursor: pointer;
        }
    }
</style>