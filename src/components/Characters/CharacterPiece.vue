<template>
    <div 
    :id="charName + 'Piece'"
    class="piece"
    :draggable="draggable"
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
  props: ['charName', 'position'],
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
    },
    draggable(){
      return this.position ? false : true;
    }
  },
  methods: {
    ...mapMutations(['setCurrentCharacter', 'removeCurrentCharacter']),
    mapCoordinates(){
      let {coordinates} = this.character;
      let piece = document.getElementById(this.charName + 'Piece');
      coordinates.forEach(coordinate => {
        let cell = piece.children[coordinate.y + 2].children[coordinate.x + 2];
        cell.classList.add('side');
      })
    },
    isMiddlePiece(row, cell){
      return row === 2 && cell === 2;
    },
    setCardDraggable(){
      let {charName} = this;
      let draggable = document.getElementById(charName + 'Piece').getAttribute('draggable');
      document.getElementById(charName + 'Selected').style.display = draggable === 'false' ? 'block' : 'none';
    }
  },
  mounted(){
    this.mapCoordinates();
  },
  updated(){
    this.mapCoordinates();
  }
}
</script>

<style scoped lang="scss">
  @import '../../variables.scss';
  @import '../../mixins.scss';

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
    @include archetype-colors;
  }

  .main, .side{
    visibility: visible;
    position: relative;
    cursor: pointer;
  }

  .main{
    background: none;
    border: none;
  }

  img {
    position: absolute;
    top: 0;
    width: 100%;
    border-radius: 3.5px;
  }

  @include for-tablet-only {
    $size: 4.4vw;
    .pieceCell {
      width: $size;
      height: $size;
    }
  }


</style>
