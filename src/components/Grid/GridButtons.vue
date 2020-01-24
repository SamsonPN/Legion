<template>
  <div id="GridBtnsWrapper">
        <button 
            id="GridAssignBtn"
            @click="assignUnits"
            title="Assign Units">
             <span>Assign</span>
        </button>
        <button 
            id="GridApplyBtn"
            @click="initiateSave"
            title="Save Preset">
            <span>Save</span>
        </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import characterCardMixin from '../../mixins/characterCardMixin';
import gridMixin from '../../mixins/gridMixin';

export default {
    name: "GridButtons",
    mixins: [characterCardMixin, gridMixin],
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
        },
        initiateSave(){
            this.resetGridArchetypes();
            this.savePreset();
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
        display: flex;
        justify-content: center;
        align-items: baseline;
        border: 1px solid white;
        border-radius: 20px;
        color: white;
        cursor: pointer;
        font: {
            size: 2em;
            weight: 400;
        }
        &:first-of-type {
            background-color: rgb(34, 136, 170);
        }
        &:last-of-type {
            background-color: rgb(68,68,102);
        }
        &:hover{
            color: yellow;
        }
    }
</style>