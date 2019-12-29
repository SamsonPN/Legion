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
            :key="index"
            :row="index">
            <div
                class="pieceCell"
                v-for="(row, index) in rows"
                :key="index"
                :cell="index">
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'LegionPiece',
  props: ['charInfo', 'charName'],
  data(){
    return {
      rows: [...new Array(5)].map((x, i) => i),
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
    getImage(charName){
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
    let {charName, charInfo} = this;
    let icon = this.getImage(charName);
    let piece = document.getElementById(charName + 'Piece');
    let cell = piece.children[2].children[2];
    let image = document.createElement('img');
    cell.classList.add('main');
    image.src = icon;
    image.style.cssText = "position: absolute; top: 0; width: 30px; height: 30px;";
    image.setAttribute('draggable', false);
    image.className = 'main';
    cell.appendChild(image);
    charInfo.coordinates.forEach(coordinate => {
      let cell = piece.children[coordinate.y + 2].children[coordinate.x + 2];
      cell.classList.add('side');
    })
  }
}
</script>

<style scoped lang="scss">
  $size: 30px;
  .piece {
    position: absolute;
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    border-collapse: collapse;
    // transform: translate( -50%, -50%);
    // transform: translate( 0%, 0%);
    top: 0;
    left: 0;
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
    visibility: hidden;
    z-index: 0;
  }

  .main, .side{
    visibility: visible;
    position: relative;
    cursor: pointer;
    border: 0.1px solid white;
  }

  .main{
    background: none;
    border: none;
  }

  .side{
    background-color: #4e4ee4;
    border: 0.1px solid white;
  }

</style>
