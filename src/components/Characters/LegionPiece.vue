<template>
    <div 
    :id="charName + 'Piece'"
    class="piece"
    draggable="true"
    @dragstart="highlight"
    @dragend="unhighlight">
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
import characterCardMixin from '../../mixins/characterCardMixin';

export default {
  name: 'LegionPiece',
  props: ['charName'],
  data(){
    return {
      rows: [...new Array(5)].map((x, i) => i)
    } 
  },
  mixins: [characterCardMixin],
  methods: {
    ...mapMutations(['setCurrentCharacter', 'removeCurrentCharacter']),
    highlight(){
      let {charName} = this;
      this.highlightCard(this, charName);
    },
    unhighlight(){
      let {charName} = this;
      this.unhighlightCard(this, charName);
    },
    mapCoordinates(coordinates){
      let piece = document.getElementById(this.charName + 'Piece');
      coordinates.forEach(coordinate => {
        let cell = piece.children[coordinate.y + 2].children[coordinate.x + 2];
        cell.classList.add('side');
      })
    }
  },
  mounted(){
    let {charInfo, charName} = this;
    let character = charInfo[charName];
    let piece = document.getElementById(charName + 'Piece');
    let cell = piece.children[2].children[2];
    let image = document.createElement('img');
    let icon = this.getImage(charName);
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
    let {charName, charInfo} = this;
    let character = charInfo[charName];
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
