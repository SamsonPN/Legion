<template>
  <table id="piece"
    draggable="true"
    @dragstart="dragStart"
    @dragend="dragEnd">
      <tbody>
        <tr
          v-for="(row, index) in rows" 
          :key="index" 
          :row="index">
          <td 
            v-for="(row, index) in rows" 
            :key="index" 
            :cell="index"
            class="up">
          </td>
        </tr>
      </tbody>
  </table>
</template>

<script>
import maple from '../../assets/maple-leaf.jpg';
export default {
  name: 'UniversalPiece',
  data(){
    return {
      rows: [...new Array(5)].map((x, i) => i),
    } 
  },
  methods: {
    dragStart(e){
      e.dataTransfer.setData("text/plain", e.target.id);
    },
    // dragEnd(e){
    //   let {target} = e;
    //   if(target.parentElement.className !== 'CharacterCard'){
    //     target.style.cssText = "position: absolute;";
    //   }
    //   else {
    //     target.style.cssText = "position: static";
    //   }
    // }
  },
  mounted(){
    // let rowIndex = 2;
    // let cellIndex = 2;
    // let cell = document.getElementsByTagName('tr')[rowIndex].cells[cellIndex];
    // let cell = document.getElementsByClassName('up')[rowIndex].cells[cellIndex];
    let up = document.getElementsByClassName('up');
    console.dir({up})
    // cell.className = 'main';
    let image = document.createElement('img');
    image.src = maple;
    image.style.cssText = "position: absolute; top: 0; width: 30px; height: 30px; z-index: 0;";
    image.setAttribute('draggable', false);
    image.className = 'maple';
    // cell.appendChild(image);

    // let obj = [
    //   {
    //     rowIndex: 1,
    //     cellIndex: 2,
    //   },
    //   {
    //     rowIndex: 2,
    //     cellIndex: 3,
    //   },
    //   {
    //     rowIndex: 2,
    //     cellIndex: 4,
    //   }
    // ];
    // obj.forEach(item => {
    //   let cell = document.getElementsByTagName('tr')[item.rowIndex].cells[item.cellIndex];
    //   cell.className = 'side';
    // })
  }
}
</script>

<style scoped lang="scss">
  $size: 30px;
  #piece {
    position: absolute;
    border-collapse: collapse;
    top: 0;
    left: 0;
    // top: 50%;
    // left: 50%;
    // transform: translate( -50%, -50%);
    z-index: 1;
  }

  .up {
    height: 3.7vh;
    width: 3.7vh;
    border: 0.1px solid white;
    // visibility: hidden;
  }

  .main, .side{
    visibility: visible;
    position: relative;
    cursor: pointer;
  }

  .side{
    background-color: red;
  }

</style>