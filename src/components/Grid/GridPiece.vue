<template>
    <div>
        <img 
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
export default {
    name: "GridPiece",
    props: ['charInfo', 'position'],
    data(){
        return {
            archetypeColors: {
            "Warrior": "red",
            "Magician": "#1414FF",
            "Bowman": "#90EE90",
            "Thief": "#4E4EE4",
            "Pirate": "orange"
            }
        }
    },
    methods: {
        fillCoordinateColors(style){
            let {archetype, coordinates} = this.charInfo;
            let {rowIndex, cellIndex} = this.position;
            let legionrow = [...document.getElementsByClassName('LegionRow')]; 
            legionrow[rowIndex].children[cellIndex].style.cssText = style;
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
            let {archetype} = this.charInfo;
            let mouseover = e.type === 'mouseover' ? true: false;
            let style = `border: 1px solid white; background-color: ${mouseover ? 'yellow' : this.archetypeColors[archetype]};`;
            this.fillCoordinateColors(style);
        },
        scrollToCard(){
            let {className} = this.charInfo;
            document.getElementById(className + 'Card').scrollIntoView();
        }
    },
    mounted(){
        let {className, coordinates, archetype} = this.charInfo;
        let {GridPieceImg} = this.$refs; 
        let icon = this.getImage(className);
        GridPieceImg.src = icon;
        let style = `border: 1px solid white; background-color: ${this.archetypeColors[archetype]}`;
        this.fillCoordinateColors(style);
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