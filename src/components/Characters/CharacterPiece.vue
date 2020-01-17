<template>
    <div 
    :id="charName + 'Piece'"
    class="piece"
    draggable="true"
    @dragstart="highlightCard(vm, charName)"
    @dragend="unhighlightCard(vm, charName)">
        <div
            class="pieceRow"       
            v-for="(row, rowIndex) in pieceSize"
            :key="rowIndex">
            <div
                :class="['pieceCell', isMiddlePiece(rowIndex, cellIndex) ? 'main' : '']"
                v-for="(cell, cellIndex) in pieceSize"
                :key="cellIndex"
                :archetype="charInfo[charName].archetype">
                <img
                  v-if="isMiddlePiece(rowIndex, cellIndex)"
                  class="main"
                  draggable="false"
                  :src="getImage(charName)" 
                  alt="Legion Image" 
                  />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import characterCardMixin from '../../mixins/characterCardMixin';

export default {
  name: 'CharacterPiece',
  props: ['charName'],
  data(){
    return {
      pieceSize: [...new Array(5)].map((x, i) => i)
    } 
  },
  mixins: [characterCardMixin],
  computed: {
    ...mapGetters(['charInfo']),
    vm(){
      return this;
    },
    character(){
      return this.charInfo[this.charName];
    }
  },
  methods: {
    ...mapMutations(['setCurrentCharacter', 'removeCurrentCharacter']),
    mapCoordinates(coordinates){
      let piece = document.getElementById(this.charName + 'Piece');
      coordinates.forEach(coordinate => {
        let cell = piece.children[coordinate.y + 2].children[coordinate.x + 2];
        cell.classList.add('side');
      })
    },
    isMiddlePiece(row, cell){
      return row === 2 && cell === 2;
    }
  },
  mounted(){
    this.mapCoordinates(this.character.coordinates);
  },
  updated(){
    let {charName, character} = this;
    let piece = document.getElementById(charName + 'Piece');
    let CardSelected = document.getElementById(charName + 'Selected');
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
    &[archetype="Lab"]{ background-color: $lab; }
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

  img {
    position: absolute;
    top: 0;
    max-width: 100%;
  }


</style>
