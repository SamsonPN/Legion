<template>
  <div id="GridBtnsWrapper">
        <button 
            id="GridApplyBtn"
            @click="savePreset">
            &#x2714;Apply
        </button>
        <button 
            id="GridAssignBtn"
            @click="assignUnits">
            Assign Units
        </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: "GridButtons",
    methods: {
        ...mapActions(['savePreset']),
        assignUnits(){
            let grid = document.getElementById('LegionGrid');
            let overlay = document.getElementById('LegionGridOverlay');
            let assigned = grid.getAttribute('assigning') === 'true' & overlay.getAttribute('assigning') === 'true';
            if(assigned){
                grid.setAttribute('assigning', false);
                overlay.setAttribute('assigning', false);
            }
            else {
                grid.setAttribute('assigning', true);
                overlay.setAttribute('assigning', true);
            }
        }
    }
}
</script>

<style scoped lang="scss">
    @import '../../variables.scss';

    #GridBtnsWrapper {
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex: 1;
    }

    button {
        outline: none;
        height: 100%;
        width: 48%;
        border: 1px solid white;
        border-radius: 20px;
        color: white;
        font-size: 1.25em;
        cursor: pointer;
        &:first-of-type {
            background-color: rgb(68,68,102);
        }
        &:last-of-type {
            background-color: rgb(34, 136, 170);
        }
        &:hover{
            text-decoration: underline;
        }
    }
</style>