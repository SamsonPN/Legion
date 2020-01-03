<template>
    <div id="rotation">
        <img @click="rotateCounterClockwise" src="../../assets/Rotations/CounterClockwise.svg" alt="None">
        <img @click="mirrorX" src="../../assets/Rotations/MirrorX.svg" alt="None">
        <img @click="mirrorY" src="../../assets/Rotations/MirrorY.svg" alt="None">
        <img @click="rotateClockwise" src="../../assets/Rotations/Clockwise.svg" alt="None">
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
    name: "CharacterRotation",
    props: ['charName'],
    methods: {
        ...mapMutations(['updateCoordinates']),
        rotateClockwise(){
            let piece = document.getElementById(this.charName + 'Piece');
            let {coordinates} = this.charInfo[this.charName];
            let rotatedCoords = coordinates.map(coord => {
                let cell = piece.children[coord.y + 2].children[coord.x + 2];
                cell.classList.remove('side');
                let x = coord.y * -1;
                let y = coord.x;
                return {x, y};
            });
            let charInfo = {
                className: this.charName,
                field: 'coordinates',
                value: rotatedCoords
            }
            this.updateCoordinates(charInfo);
        },
        rotateCounterClockwise(){
            let piece = document.getElementById(this.charName + 'Piece');
            let {coordinates} = this.charInfo[this.charName];
            let rotatedCoords = coordinates.map(coord => {
                let cell = piece.children[coord.y + 2].children[coord.x + 2];
                cell.classList.remove('side');
                let x = coord.y;
                let y = coord.x * -1;
                return {x, y};
            });
            let charInfo = {
                className: this.charName,
                field: 'coordinates',
                value: rotatedCoords
            }
            this.updateCoordinates(charInfo);
        },
        mirrorX(){
            let piece = document.getElementById(this.charName + 'Piece');
            let {coordinates} = this.charInfo[this.charName];
            let rotatedCoords = coordinates.map(coord => {
                let cell = piece.children[coord.y + 2].children[coord.x + 2];
                cell.classList.remove('side');
                coord.y *= -1;
                return coord;
            });
            let charInfo = {
                className: this.charName,
                field: 'coordinates',
                value: rotatedCoords
            }
            this.updateCoordinates(charInfo);
        },
        mirrorY(){
            let piece = document.getElementById(this.charName + 'Piece');
            let {coordinates} = this.charInfo[this.charName];
            let rotatedCoords = coordinates.map(coord => {
                let cell = piece.children[coord.y + 2].children[coord.x + 2];
                cell.classList.remove('side');
                coord.x *= -1;
                return coord;
            });
            let charInfo = {
                className: this.charName,
                field: 'coordinates',
                value: rotatedCoords
            }
            this.updateCoordinates(charInfo);
        }
    },
    computed: mapGetters(['charInfo'])
}
</script>

<style scoped lang="scss">
    #rotation {
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
        width: 50px;
        height: 50px;
        cursor: pointer;
        &:hover {
            opacity: 0.5;
        }
    }
</style>