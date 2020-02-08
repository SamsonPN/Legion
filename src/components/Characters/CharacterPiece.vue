<template>
    <div 
    :id="className + 'Piece'"
    class="piece"
    :draggable="draggable"
    @dragstart="dragStart"
    @dragend="unhighlightCard(vm, className)">
        <div
            class="pieceRow"       
            v-for="(row, rowIndex) in pieceSize"
            :key="rowIndex">
            <div
                :class="['pieceCell', isMiddlePiece(rowIndex, cellIndex) ? 'main' : '']"
                v-for="(cell, cellIndex) in pieceSize"
                :key="cellIndex"
                :archetype="charInfo[className].archetype">
                <img
                  v-if="isMiddlePiece(rowIndex, cellIndex)"
                  class="main"
                  draggable="false"
                  :src="getImage(className)" 
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
  props: ['className', 'position'],
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
      return this.charInfo[this.className];
    },
    draggable(){
      return this.position ? false : true;
    }
  },
  methods: {
    ...mapMutations(['removeCurrentCharacter', 'setCurrentCharacter']),
    dragStart(){
      let {className, charInfo} = this;
      this.highlightCard(className);
      this.setCurrentCharacter({
        ...charInfo[className],
        className: className
        });
    },
    mapCoordinates(){
      let {coordinates} = this.character;
      let piece = document.getElementById(this.className + 'Piece');
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

  @include for-desktop-large-only {
    .pieceCell {
      width: $largeSize;
      height: $largeSize;
    }
  }

  @include for-tablet-only {
    .pieceCell {
      width: $tabletSize;
      height: $tabletSize;
    }
  }


</style>
