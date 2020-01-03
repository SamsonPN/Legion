<template>
    <div 
    :id="charName + 'Piece'"
    class="piece"
    draggable="true"
    @dragstart="dragStart"
    @dragend="dragEnd">
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
import { mapGetters } from 'vuex';
export default {
  name: 'LegionPiece',
  props: ['charName'],
  data(){
    return {
      rows: [...new Array(5)].map((x, i) => i)
    } 
  },
  methods: {
    dragStart(e){
      let object = {
        id: e.target.id,
        coordinates: this.charInfo.coordinates
      }
      e.dataTransfer.setData("text/plain", JSON.stringify(object));
    },
    dragEnd(e){
      e.dataTransfer.clearData();
    },
    getImage(){
      let {charName} = this;
      let newName;
      if(charName === 'Archmage Fire/Poison'){
        newName = 'FP';
      }
      else if (charName === 'Archmage Ice/Lightning'){
        newName = 'IL';
      }
      else {
        newName = charName;
      }
      return require(`../../assets/ClassIcons/${newName}.png`);
    }
  },
  mounted(){
    let {charInfo, charName} = this;
    let character = charInfo[charName];
    let icon = this.getImage();
    let piece = document.getElementById(charName + 'Piece');
    let cell = piece.children[2].children[2];
    let image = document.createElement('img');
    cell.classList.add('main');
    image.src = icon;
    image.style.cssText = "position: absolute; top: 0; max-width: 100%;";
    image.setAttribute('draggable', false);
    image.className = 'main';
    cell.appendChild(image);
    character.coordinates.forEach(coordinate => {
      let cell = piece.children[coordinate.y + 2].children[coordinate.x + 2];
      cell.classList.add('side');
    })
  },
  computed: mapGetters(['charInfo']),
  updated(){
    let character = this.charInfo[this.charName];
    let piece = document.getElementById(this.charName + 'Piece');
    character.coordinates.forEach(coordinate => {
      let cell = piece.children[coordinate.y + 2].children[coordinate.x + 2];
      cell.classList.add('side');
    })
  }
}
</script>

<style scoped lang="scss">
  $size: 30px;

  .piece {
    // position: absolute;
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    border-collapse: collapse;
    transform: translate( 0%, 0%);
    top: 50;
    left: 50;
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
    // visibility: hidden;
    z-index: 0;
    border-radius: 3.5px;
      &[archetype="Warrior"]{ background-color: red; }
      &[archetype="Magician"]{ background-color: #1414FF; }
      &[archetype="Bowman"]{ background-color: #90EE90; }
      &[archetype="Thief"]{ background-color: #4E4EE4; }
      &[archetype="Pirate"]{ background-color: orange; }
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
