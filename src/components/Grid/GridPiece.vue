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

export default {
    name: "GridPiece",
    props: ['charInfo', 'position'],
    mixins: [characterCardMixin],
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
                if( y >= 0 && y < 20 &&
                    x >= 0 && x < 22){
                        legionrow[y].children[x].style.cssText = style;
                }
            }) 
        },
        removePiece(e){
            let {className} = this.charInfo;
            let charInfo = {
                position: this.position,
                className
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
            document.getElementById(className + 'Card').scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start"
            });
            this.highlightCard(this, className);
            this.setCurrentChar();
        },
        setArchetypes(){
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
                        let cell = legionrow[y].children[x];
                        let archetypeList = cell.getAttribute('archetypeList');
                        archetypeList += `,${archetype}`;
                        cell.setAttribute('archetypeList', archetypeList);
                        archetypeList = archetypeList.split(",").filter(el => el.length !== 0);
                        let archetypeListLength = archetypeList.length;
                        let newArchetype;
                        if(archetypeListLength === 0){
                            newArchetype = "";
                        }
                        else if(archetypeListLength === 1){
                            newArchetype = archetypeList[0];
                        }
                        else if(archetypeListLength > 1){
                            newArchetype = "Overlap";
                        }
                        cell.setAttribute('archetype', newArchetype);
                }
            })
        }
    },
    mounted(){
        let icon = this.getImage(this.charInfo.className);
        this.$refs.GridPieceImg.src = icon;
        this.setArchetypes();
    },
    computed: mapGetters(['currentPreset']),
    updated(){
        this.setArchetypes();
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