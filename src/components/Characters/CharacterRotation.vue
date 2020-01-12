<template>
    <div 
        :id="charName + 'Rotation'">
        <img 
            @click="rotateCounterClockwise" 
            src="../../assets/Rotations/CounterClockwise.svg" 
            ref="counterClockwise"
            clickable="true"
            alt="None">
        <img 
            @click="mirrorX" 
            src="../../assets/Rotations/MirrorX.svg" 
            ref="mirrorX"
            clickable="true"
            alt="None">
        <img 
            @click="mirrorY" 
            src="../../assets/Rotations/MirrorY.svg" 
            ref="mirrorY"
            clickable="true"
            alt="None">
        <img 
            @click="rotateClockwise" 
            src="../../assets/Rotations/Clockwise.svg" 
            ref="clockwise"
            clickable="true"
            alt="None">
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: "CharacterRotation",
    props: ['charName'],
    methods: {
        ...mapActions(['removeSidePieces', 'updateAllCoordinates']),
        rotateClockwise(){
            let clickable = this.$refs.clockwise.getAttribute('clickable') === 'true';
            if(clickable){
                let piece = document.getElementById(this.charName + 'Piece');
                let {coordinates} = this.charInfo[this.charName];
                this.removeSidePieces({...this.charInfo[this.charName], className: this.charName});
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
                this.updateAllCoordinates(charInfo);
            }
        },
        rotateCounterClockwise(){
            let clickable = this.$refs.counterClockwise.getAttribute('clickable') === 'true';
            if(clickable){
                let piece = document.getElementById(this.charName + 'Piece');
                let {coordinates} = this.charInfo[this.charName];
                this.removeSidePieces(coordinates);
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
                this.updateAllCoordinates(charInfo);
            }
        },
        mirrorX(){
            let clickable = this.$refs.mirrorX.getAttribute('clickable') === 'true';
            if(clickable){
                let piece = document.getElementById(this.charName + 'Piece');
                let {coordinates} = this.charInfo[this.charName];
                this.removeSidePieces(coordinates);
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
                this.updateAllCoordinates(charInfo);
            }
        },
        mirrorY(){
            let clickable = this.$refs.mirrorY.getAttribute('clickable') === 'true';
            if(clickable){
                let piece = document.getElementById(this.charName + 'Piece');
                let {coordinates} = this.charInfo[this.charName];
                this.removeSidePieces(coordinates);
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
                this.updateAllCoordinates(charInfo);
            }
            }
    },
    computed: mapGetters(['charInfo'])
}
</script>

<style scoped lang="scss">
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
        width: 50px;
        height: 50px;
        cursor: pointer;
        &:hover {
            opacity: 0.5;
        }
    }
</style>