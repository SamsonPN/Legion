<template>
    <div id="piece"
        draggable="true"
        @dragstart="dragStart"
        @dragend="dragEnd">
            <div piece="main">P</div>
            <div></div>
            <div></div>
            <div></div>
    </div>
</template>

<script>
export default {
    name:"Piece",
    methods:{
        dragStart(e){
            e.dataTransfer.setData("text/plain", e.target.id)
        },
        dragEnd(e){
            let {target} = e;
            if(target.parentElement.className !== 'CharacterCard'){
                target.style.cssText = "position: absolute;";
            }
            else {
                target.style.cssText = "position: static";
            }
        },
    }
}
</script>

<style scoped lang="scss">
    $size: 30px;
    #piece {
        height: auto;
        width: auto;
        position: absolute;
        position: static;
        top: 0;
        left: 0;
        z-index: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        > div{
            width: $size;
            height: $size;
            color: white;
            text-align: center;
            background-color: black;
            &[piece="main"]{
                cursor: pointer;
            }
        }
        &:hover > div{
            border: 1px dashed gold;
        }
    }
</style>