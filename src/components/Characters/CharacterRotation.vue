<template>
    <div 
        :id="charName + 'Rotation'">
        <img 
            draggable="false"
            class="rotationImg"
            @click="rotateCounterClockwise" 
            src="../../assets/Rotations/CounterClockwise.svg" 
            ref="counterClockwise"
            clickable="true"
            alt="None">
        <img 
            draggable="false"
            class="rotationImg"
            @click="mirrorX" 
            src="../../assets/Rotations/MirrorX.svg" 
            ref="mirrorX"
            clickable="true"
            alt="None">
        <img 
            draggable="false"
            class="rotationImg"
            @click="mirrorY" 
            src="../../assets/Rotations/MirrorY.svg" 
            ref="mirrorY"
            clickable="true"
            alt="None">
        <img 
            draggable="false"
            class="rotationImg"
            @click="rotateClockwise" 
            src="../../assets/Rotations/Clockwise.svg" 
            ref="clockwise"
            clickable="true"
            alt="None">
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import gridMixin from '../../mixins/gridMixin';

export default {
    name: "CharacterRotation",
    props: ['charName'],
    mixins: [gridMixin],
    methods: {
        ...mapActions(['removeSidePieces', 'updateAllCoordinates']),
        updateCoords(rotatedCoords){
            let charInfo = {
                className: this.charName,
                field: 'coordinates',
                value: rotatedCoords
            }
            this.updateAllCoordinates(charInfo);
        },
        rotateClockwise(){
            let clickable = this.$refs.clockwise.getAttribute('clickable') === 'true';
            if(clickable){
                let piece = document.getElementById(this.charName + 'Piece');
                let {coordinates} = this.currentCharacter;
                this.setArchetypes({ ...this.currentCharacter, append: false});
                let rotatedCoords = coordinates.map(coord => {
                    let cell = piece.children[coord.y + 2].children[coord.x + 2];
                    cell.classList.remove('side');
                    let x = coord.y * -1;
                    let y = coord.x;
                    return {x, y};
                });
                this.updateCoords(rotatedCoords);
            }
        },
        rotateCounterClockwise(){
            let clickable = this.$refs.counterClockwise.getAttribute('clickable') === 'true';
            if(clickable){
                let piece = document.getElementById(this.charName + 'Piece');
                let {coordinates} = this.currentCharacter;
                this.setArchetypes({ ...this.currentCharacter, append: false});
                let rotatedCoords = coordinates.map(coord => {
                    let cell = piece.children[coord.y + 2].children[coord.x + 2];
                    cell.classList.remove('side');
                    let x = coord.y;
                    let y = coord.x * -1;
                    return {x, y};
                });
                this.updateCoords(rotatedCoords);
            }
        },
        mirrorX(){
            let clickable = this.$refs.mirrorX.getAttribute('clickable') === 'true';
            if(clickable){
                let piece = document.getElementById(this.charName + 'Piece');
                let {coordinates} = this.currentCharacter;
                this.setArchetypes({ ...this.currentCharacter, append: false});                let rotatedCoords = coordinates.map(coord => {
                    let cell = piece.children[coord.y + 2].children[coord.x + 2];
                    cell.classList.remove('side');
                    coord.y *= -1;
                    return coord;
                });
                this.updateCoords(rotatedCoords);
            }
        },
        mirrorY(){
            let clickable = this.$refs.mirrorY.getAttribute('clickable') === 'true';
            if(clickable){
                let piece = document.getElementById(this.charName + 'Piece');
                let {coordinates} = this.currentCharacter;
                this.setArchetypes({ ...this.currentCharacter, append: false});                let rotatedCoords = coordinates.map(coord => {
                    let cell = piece.children[coord.y + 2].children[coord.x + 2];
                    cell.classList.remove('side');
                    coord.x *= -1;
                    return coord;
                });
                this.updateCoords(rotatedCoords);
            }
        }
    },
    computed: mapGetters(['charInfo', 'currentCharacter'])
}
</script>

<style scoped lang="scss">
    @import '../../variables.scss';
    @import '../../mixins.scss';

    div {
        height: auto;
        width: 80%;
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        background-color: white;
        background: none;
        color: black;
    }
    img {
        max-width: 17.5%;
        max-height: 20%;
        cursor: pointer;
        &:hover {
            opacity: 0.5;
        }
        &[clickable="false"]{
            opacity: 0.25;
        }
    }

    @include for-tablet-only {
        img {
            max-width: 12.5%;
            max-height: 15%;
        }
    }
</style>