<template>
      <div id="OptionButtons">
        <button
            id="OptionResetBtn"
            @click="initiateResetOptions">
            Reset
        </button>
        <button 
            id="OptionSaveBtn"
            @click="initiateSaveOptions">
            Save
        </button>
      </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'OptionButtons',
    methods: {
        ...mapActions(['saveOptions', 'resetOptions']),
        initiateSaveOptions(){
            let save = window.confirm('Save these options?');
            if(save){
                this.saveOptions();
                alert('Options Saved!');
            }
        },
        initiateResetOptions(){
            alert('WARNING: THIS WILL RESET ALL COLOR OPTIONS TO THEIR DEFAULT SETTINGS!')
            let confirm = window.confirm('RESET OPTIONS?')
            if(confirm){
                this.resetOptions();
                this.$router.go();
            }
        }
    },
}
</script>

<style scoped lang="scss">
    #OptionButtons {
        width: 100%;
        display: flex;
        justify-content: center;
        > button {
            width: 20%;
            border-radius: 30px;
            border: none;
            font-size: 1.5em;
            background-color: white;
            cursor: pointer;
            &:hover {
                opacity: 0.75;
            }
        }
        > #OptionResetBtn {
            background-color: red;
            color: white;
        }
        > #OptionSaveBtn {
            margin-left: 5%;
        }
    }
</style>