<template>
  <div id="piece2"
    draggable="true"
    @dragstart="dragStart">
      <div>
          <p piece="main">K</p>
          <p></p>
      </div>
      <div>
          <p></p>
          <p id="invisible"></p>
      </div>
  </div>
</template>

<script>
export default {
    name:"SquarePiece",
    methods:{
        dragStart(e){
            console.log('start')
            e.dataTransfer.setData("text/plain", e.target.id)
        },
        dragEnd(){
            console.log('end')
        }
    }
}
</script>

<style scoped lang="scss">
    $size: 30px;
    #invisible{
        visibility: hidden;
    }
    #piece2 {
        height: auto;
        width: auto;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        > div {
            > p{
                width: $size;
                height: $size;
                color: white;
                text-align: center;
                background: black;
                &[piece="main"]{
                    cursor: pointer;
                }
            }
        }
        &:hover > div > p{
            border: 1px dashed yellow;
        }
    }

</style>