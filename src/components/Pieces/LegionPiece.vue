<template>
    <div 
    :id="charName + 'Piece'"
    class="piece"
    draggable="true"
    @dblclick="highlightCard"
    @dragstart="highlightCard"
    @dragend="highlightCard">
        <div
            class="pieceRow"       
            v-for="(row, index) in rows"
            :key="index">
            <div
                class="pieceCell"
                v-for="(row, index) in rows"
                :key="index"
                :archetype="charInfo[charName].archetype">
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'LegionPiece',
  props: ['charName'],
  data(){
    return {
      rows: [...new Array(5)].map((x, i) => i)
    } 
  },
  methods: {
    ...mapMutations(['setCurrentCharacter', 'removeCurrentCharacter']),
    getImage(){
      let {charName} = this;
      if(charName === 'Archmage Fire/Poison'){
        charName = 'FP';
      }
      else if (charName === 'Archmage Ice/Lightning'){
        charName = 'IL';
      }
      return require(`../../assets/ClassIcons/${charName}.png`);
    },
    highlightCard(e){
      let {charName} = this;
      let cardList = document.getElementById('CardContainer');
      let card = document.getElementById(this.charName + 'Card');
      let toggled = card.getAttribute('toggled');
      if(toggled){
        this.removeCurrentCharacter();
        card.style.cssText = "border: 1px solid white;";
        card.removeAttribute('toggled');
      }
      else {
        let currentChar = {
          className: charName,
          position: false
        };
        this.removeAllHighlights();
        this.setCurrentCharacter(currentChar)
        card.style.cssText = "border: 5px solid yellow;";
        card.setAttribute('toggled', true);
      }
    },
    mapCoordinates(coordinates){
      // console.log({[this.charName]: coordinates});
      let piece = document.getElementById(this.charName + 'Piece');
      coordinates.forEach(coordinate => {
        let cell = piece.children[coordinate.y + 2].children[coordinate.x + 2];
        cell.classList.add('side');
      })
    },
    removeAllHighlights(){
      let cards = [...document.getElementsByClassName('CharacterCard')];
      cards.forEach(card => {
          card.style.cssText = "border: 1px solid white";
          card.removeAttribute('toggled');
      })
    }
  },
  mounted(){
    let {charInfo, charName} = this;
    let character = charInfo[charName];
    let piece = document.getElementById(charName + 'Piece');
    let cell = piece.children[2].children[2];
    let image = document.createElement('img');
    let icon = this.getImage();
    cell.classList.add('main');
    image.src = icon;
    image.style.cssText = "position: absolute; top: 0; max-width: 100%;";
    image.setAttribute('draggable', false);
    image.className = 'main';
    cell.appendChild(image);
    this.mapCoordinates(character.coordinates);
  },
  computed: mapGetters(['charInfo']),
  updated(){
    let character = this.charInfo[this.charName];
    let piece = document.getElementById(this.charName + 'Piece');
    let CardSelected = document.getElementById(this.charName + 'Selected');
    let draggable = piece.getAttribute('draggable');
    this.mapCoordinates(character.coordinates);
    if(draggable === 'false'){
      CardSelected.style.display = 'block';
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../variables.scss';

  .piece {
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    border-collapse: collapse;
    background: none;
    > .pieceRow {
      display: flex;
      visibility: hidden;
    }
  }

  .pieceCell {
    display: flex;
    height: $size;
    width: $size;
    z-index: 0;
    border-radius: 3.5px;
    &[archetype="Warrior"]{ background-color: $warrior; }
    &[archetype="Magician"]{ background-color: $magician; }
    &[archetype="Bowman"]{ background-color: $bowman; }
    &[archetype="Thief"]{ background-color: $thief; }
    &[archetype="Pirate"]{ background-color: $pirate; }
  }

  .main, .side{
    visibility: visible;
    position: relative;
    border: 0.5px solid white;
    cursor: pointer;
  }

  .main{
    background: none;
    border: none;
  }


</style>
