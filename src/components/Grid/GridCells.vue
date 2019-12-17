<template>
    <td
        @dragover.prevent="dragOver"
        @dragenter="dragEnter"
        @dragleave="dragLeave"
        @drop="dragDrop">
    </td>
</template>

<script>
export default {
    name: "GridCells",
    props: ['cell'],
    methods:{
        dragOver(e){
            console.log('Over');
            e.currentTarget.style.border = '0.1px solid white';          
        },
        dragEnter(){
            console.log('Enter');
        },
        dragLeave(e){
            console.log('Leave');
            e.currentTarget.style.border = '0.1px solid #FF22FF';
        },
        dragDrop(e){
            console.log('Drop');
            let id = e.dataTransfer.getData("text");
            let piece = document.getElementById(id);
            e.currentTarget.appendChild(piece);
            e.currentTarget.style.border = '0.1px solid #FF22FF';
        }
    }
}
</script>

<style scoped lang="scss">
    $size: 30px;
    td {
       width: $size;
       height: $size;
       border: 0.1px solid #FF22FF;
       position: relative;
    }
</style>