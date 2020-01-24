<template>
    <div 
        :id="charName + 'Rotation'">
        <img 
            draggable="false"
            class="rotationImg"
            @click="rotate($event, 'counterClockwise')"
            src="../../assets/Rotations/CounterClockwise.svg" 
            ref="counterClockwise"
            clickable="true"
            alt="None">
        <img 
            draggable="false"
            class="rotationImg"
            @click="rotate($event, 'mirrorX')"
            src="../../assets/Rotations/MirrorX.svg" 
            ref="mirrorX"
            clickable="true"
            alt="None">
        <img 
            draggable="false"
            class="rotationImg"
            @click="rotate($event, 'mirrorY')"
            src="../../assets/Rotations/MirrorY.svg" 
            ref="mirrorY"
            clickable="true"
            alt="None">
        <img 
            draggable="false"
            class="rotationImg"
            @click="rotate($event, 'clockwise')"
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
        isCurrentClass(){
            return this.currentCharacter.className === this.charName;
        },
        updateCoords(rotatedCoords){
            let charInfo = {
                className: this.charName,
                field: 'coordinates',
                value: rotatedCoords
            }
            this.updateAllCoordinates(charInfo);
        },
        calculateRotation(rotationInfo){
            let {rotation, x, y} = rotationInfo;
            let newX;
            let newY;
            switch(rotation){
                case 'counterClockwise':
                    newX = y;
                    newY = x * -1;
                    break;
                case 'mirrorX':
                    newX = x;
                    newY = y * -1;
                    break;
                case 'mirrorY':
                    newX = x * -1;
                    newY = y;
                    break;
                case 'clockwise':
                    newX = y * -1;
                    newY = x;
                    break;
            }
            return {
                x: newX,
                y: newY
            }
        },
        removeSidePieces(charInfo){
            if(this.isCurrentClass()){
                this.setArchetypes(charInfo)
            }
        },
        clickable(e){
            return e.target.getAttribute('clickable') === 'true';
        },
        rotate(e, rotation){
            if(this.clickable(e)){
                let piece = document.getElementById(this.charName + 'Piece');
                let {coordinates} = this.charInfo[this.charName];
                this.removeSidePieces({ ...this.currentCharacter, append: false});             
                let rotatedCoords = coordinates.map(coord => {
                    let cell = piece.children[coord.y + 2].children[coord.x + 2];
                    cell.classList.remove('side');
                    let calculatedCoords = this.calculateRotation({
                        x: coord.x,
                        y: coord.y,
                        rotation
                    })
                    return calculatedCoords;
                });
                this.updateCoords(rotatedCoords);      
            }
        },
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