<template>
    <div
        draggable="true"
        @dragstart="dragStart"
        @click="scrollToCard"
        @mousedown="removePiece">
        <img
            :id="charInfo.className + 'Image'"
            ref="GridPieceImg" 
            src=""
            alt="GP">
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations} from 'vuex';
export default {
    name: "GridPiece",
    props: ['charInfo', 'position'],
    methods: {
        ...mapActions(['removeGridPiece']),
        ...mapMutations(['setCurrentCharacter']),
        dragStart(e){
            let {className} = this.charInfo;
            let piece = document.getElementById(className + 'Piece');
            e.dataTransfer.setDragImage(piece, 80, 80);
            this.scrollToCard(e)
        },
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
        activateDraggablePiece(className){
            document.getElementById(className + 'Piece').setAttribute('draggable', true);
            document.getElementById(className + 'Selected').style.display = "none";
        },
        removePiece(e){
            let mouseEvent = e.which;
            let rightClick = 3;
            if(mouseEvent === rightClick){
                let {className} = this.charInfo;
                let charInfo = {
                    position: this.position,
                    className
                }
                this.removeGridPiece(charInfo);
                this.activateDraggablePiece(className)
            }
        },
        scrollToCard(e){
            e.stopPropagation();
            let {className} = this.charInfo;
            let piece = document.getElementById(className + 'Piece');
            document.getElementById(className + 'Card').scrollIntoView();
            let doubleClick = new MouseEvent('dblclick', {
                'view': window,
                'bubbles': true,
                'cancelable': true,
            });
            document.getElementById(className + 'Piece').dispatchEvent(doubleClick);
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
</style>