<template>
    <div 
        :id="className + 'Rotation'">
            <img
                v-for="rotation in rotations"
                class="rotationImg"
                draggable="false"
                :key="rotation"
                :clickable="isClickable"
                :src="getRotationImg(rotation)"
                @click="rotate($event, rotation)"
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
            rotations: ['CounterClockwise', 'MirrorX', 'MirrorY', 'Clockwise']
        }
    },
    props: ['className', 'position'],
    mixins: [gridMixin],
    computed: {
        ...mapGetters(['charInfo', 'currentCharacter']),
        isClickable(){
            return this.position ? 'false' : 'true';
        }
    },
    methods: {
        ...mapActions(['removeSidePieces', 'updateAllCoordinates']),
        getRotationImg(rotation){
            return require(`../../assets/Rotations/${rotation}.svg`);
        },
        rotate(e, rotation){
            if(this.clickable(e)){
                let piece = document.getElementById(this.className + 'Piece');
                let {coordinates} = this.charInfo[this.className];
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
                this.setArchetypes(charInfo);
            }
        },
        isCurrentClass(){
            return this.currentCharacter.className === this.className;
        },
        calculateRotation(rotationInfo){
            let {rotation, x, y} = rotationInfo;
            let newX;
            let newY;
            switch(rotation){
                case 'CounterClockwise':
                    newX = y;
                    newY = x * -1;
                    break;
                case 'MirrorX':
                    newX = x;
                    newY = y * -1;
                    break;
                case 'MirrorY':
                    newX = x * -1;
                    newY = y;
                    break;
                case 'Clockwise':
                    newX = y * -1;
                    newY = x;
                    break;
            }
            return {
                x: newX,
                y: newY
            }
        },
        updateCoords(coordinates){
            let charInfo = {
                className: this.className,
                coordinates
            }
            this.updateAllCoordinates(charInfo);
        }
    }
}
</script>

<style scoped lang="scss">
    @import '../../variables.scss';
    @import '../../mixins.scss';

    div {
        width: 100%;
        display: flex;
        justify-content: space-around;
        background-color: white;
        background: none;
        color: black;
        margin-top: 5px;
        > img {
            max-width: 17.5%;
            cursor: url('../../assets/ms-cursor.png'), auto;
            &:hover {
                opacity: 0.5;
            }
            &[clickable="false"]{
                opacity: 0.25;
            }
        }
    }
</style>