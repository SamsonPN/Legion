<template>
    <div 
    id="piece"
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
import maple from '../../assets/ClassIcons/PHANTOM.png';
export default {
  name: 'LegionPiece',
  data(){
    return {
      rows: [...new Array(5)].map((x, i) => i),
    } 
  },
  methods: {
    dragStart(e){
      let object = {
        id: e.target.id,
        coordinates: [
          {
            x: 0,
            y: -1
          },
          {
            x: 1,
            y: 0
          },
          {
            x: 2,
            y: 0
          }
        ]
      }
      e.dataTransfer.setData("text/plain", JSON.stringify(object));
    },
    dragEnd(e){
      e.dataTransfer.clearData();
    }
  },
  mounted(){
    let rowIndex = 2;
    let cellIndex = 2;
    let row = [...document.getElementsByClassName('pieceRow')];
    let cell = row[rowIndex].children[cellIndex];
    cell.classList.add('main');
    let image = document.createElement('img');
    image.src = maple;
    image.style.cssText = "position: absolute; top: 0; width: 30px; height: 30px;";
    image.setAttribute('draggable', false);
    image.className = 'maple';
    cell.appendChild(image);

    // this obj will be replaced with props from Character Card that will contain
    // this information 
    let obj = [
      {
        rowIndex: 1,
        cellIndex: 2,
      },
      {
        rowIndex: 2,
        cellIndex: 3,
      },
      {
        rowIndex: 2,
        cellIndex: 4,
      }
    ];
    obj.forEach(item => {
      let row = [...document.getElementsByClassName('pieceRow')];
      let cell = row[item.rowIndex].children[item.cellIndex];
      cell.classList.add('side');
    })
  }
}
</script>

<style scoped lang="scss">
  $size: 30px;
  #piece {
    position: absolute;
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    border-collapse: collapse;
    top: 0;
    left: 0;
    top: 50%;
    left: 50%;
    z-index: 0;
    transform: translate( -50%, -50%);
    background: none;
    > .pieceRow {
      display: flex;
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
  }

  .side{
    background-color: #4e4ee4;
    border: 0.1px solid white;
  }

</style>
