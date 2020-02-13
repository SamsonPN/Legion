<template>
      <div 
        id="OptionButtons">
        <div
            class="OptionBtn"
            id="OptionDownloadBtn">
            <p>Presets</p>
            <a
                @click="downloadJSON"
                href=""
                ref="downloadAnchor">
                <img src="../../assets/save.svg" alt="Save">
            </a>
        </div>
        <button
            class="OptionBtn"
            id="OptionResetBtn"
            @click="initiateResetOptions">
            Reset
        </button>
        <button 
            class="OptionBtn"
            id="OptionSaveBtn"
            @click="initiateSaveOptions">
            Save
        </button>
      </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'OptionButtons',
    computed: mapGetters(['presets']),
    methods: {
        ...mapActions(['saveOptions', 'resetOptions']),
        downloadJSON(){
            let {downloadAnchor} = this.$refs;
            let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.presets));
            downloadAnchor.setAttribute('href', dataStr);
            downloadAnchor.setAttribute('download', 'Presets.json')
        },
        initiateResetOptions(){
            alert('WARNING: THIS WILL RESET ALL COLOR OPTIONS TO THEIR DEFAULT SETTINGS!')
            let confirm = window.confirm('RESET OPTIONS?')
            if(confirm){
                this.resetOptions();
                this.$router.go();
            }
        },
        initiateSaveOptions(){
            let save = window.confirm('Save these options?');
            if(save){
                this.saveOptions();
                alert('Options Saved!');
            }
        }
    },
}
</script>

<style scoped lang="scss">
    #OptionButtons {
        width: 100%;
        display: flex;
        justify-content: space-around;
        > .OptionBtn {
            width: 20%;
            border: none;
            border-radius: 30px;
            font-size: 1.5em;
            color: white;
            cursor: pointer;
            &:hover {
                opacity: 0.75;
            }
        }
        > #OptionDownloadBtn {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: blue;
            > a {
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                    height: 35px;
                    width: 35px;
                }
            }
        }
        > #OptionResetBtn {
            background-color: red;
        }
        > #OptionSaveBtn {
            background-color: green;
        }
    }
</style>