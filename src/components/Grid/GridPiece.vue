<template>
    <div
        draggable="true"
        @dragstart="setDragImage"
        @click="scrollToCard"
        @contextmenu.prevent="removePiece">
        <img
            :id="charInfo.className + 'Image'"
            ref="GridPieceImg" 
            src=""
            alt="GP">
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations} from 'vuex';
import characterCardMixin from '../../mixins/characterCardMixin';
import gridMixin from '../../mixins/gridMixin';

export default {
    name: "GridPiece",
    props: ['charInfo', 'position'],
    mixins: [characterCardMixin, gridMixin],
    methods: {
        ...mapActions(['removeGridPiece']),
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
                if(this.isWithinGrid(x, y)){
                    legionrow[y].children[x].style.cssText = style;
                }
            }) 
        },
        removePiece(e){
            let {className} = this.charInfo;
            let charInfo = {
                className,
                position: this.position
            }
            this.removeGridPiece(charInfo);
            this.reactivateCharacterCard(className, false);
            this.removeAllHighlights('CharacterCard');
        },
        setDragImage(e){
            let {className} = this.charInfo;
            let piece = document.getElementById(className + 'Piece');
            e.dataTransfer.setDragImage(piece, 80, 80);
            this.setCurrentChar();
        },
        setCurrentChar(){
            let currentChar = {
                className: this.charInfo.className,
                position: this.position
            };
            this.setCurrentCharacter(currentChar);
        },
        scrollToCard(e){
            let {className} = this.charInfo;
            let piece = document.getElementById(className + 'Piece');
            document.getElementById(className + 'Card').scrollIntoView();
            this.highlightCard(this, className);
            this.setCurrentChar();
        }
    },
    mounted(){
        let icon = this.getImage(this.charInfo.className);
        this.$refs.GridPieceImg.src = icon;
        this.setArchetypes({
            ...this.charInfo,
            position: this.position,
            append: true
        })
    },
    computed: mapGetters(['currentPreset']),
    updated(){
        this.setArchetypes({
            ...this.charInfo,
            position: this.position,
            append: true
        });
    }
}
</script>

<style scoped lang="scss">
    div {
        width: 100%;
        height: 100%;
        position: relative;
    }
    img {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        object-fit: cover;
        cursor: pointer;
    }

</style>