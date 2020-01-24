<template>
    <div 
        :id="charName + 'Rotation'">
            <img
                v-for="rotation in rotations"
                :key="rotation"
                draggable="false"
                class="rotationImg"
                @click="rotate($event, rotation)"
                :src="getRotationImg(rotation)"
                clickable="true"
                alt="rotations"
            />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import gridMixin from '../../mixins/gridMixin';

export default {
    name: "CharacterRotation",
    data(){
        return {
            rotations: ['counterClockwise', 'mirrorX', 'mirrorY', 'clockwise']
        }
    },
    props: ['charName'],
    mixins: [gridMixin],
    methods: {
        ...mapActions(['removeSidePieces', 'updateAllCoordinates']),
        getRotationImg(rotation){
            return require(`../../assets/Rotations/${rotation}.svg`);
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
        clickable(e){
            return e.target.getAttribute('clickable') === 'true';
        },
        removeSidePieces(charInfo){
            if(this.isCurrentClass()){
                this.setArchetypes(charInfo)
            }
        },
        isCurrentClass(){
            return this.currentCharacter.className === this.charName;
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
        updateCoords(rotatedCoords){
            let charInfo = {
                className: this.charName,
                field: 'coordinates',
                value: rotatedCoords
            }
            this.updateAllCoordinates(charInfo);
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
        width: 100%;
        display: flex;
        justify-content: space-around;
        background-color: white;
        background: none;
        color: black;
    }
    img {
        max-width: 15%;
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
            max-width: 17.5%;
            max-height: 95%;
        }
    }
</style>