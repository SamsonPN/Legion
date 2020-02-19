<template>
      <div 
        id="OptionButtons">
        <div
            class="OptionBtn"
            id="OptionDownloadBtn"
            @click="downloadJSON">
            <p>Presets</p>
            <a
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
            downloadAnchor.setAttribute('download', 'Presets.json');
            downloadAnchor.click();
        },
        initiateResetOptions(){
            alert('WARNING: THIS WILL RESET ALL COLOR OPTIONS TO THEIR DEFAULT SETTINGS!')
            let confirm = window.confirm('RESET OPTIONS?')
            if(confirm){
                this.resetOptions();
                setTimeout(() => {
                    this.$router.go();
                }, 1500);
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
    @import '../../mixins.scss';

    #OptionButtons {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 10px;
        > .OptionBtn {
            width: 20%;
            border: none;
            border-radius: 30px;
            font-size: 1.5em;
            color: white;
            cursor: url('../../assets/ms-cursor.png'), auto;
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
                pointer-events: none;
                > img {
                    height: 35px;
                    width: 35px;
                    cursor: url('../../assets/ms-cursor.png'), auto;
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

    @include for-desktop-large-only {
        #OptionButtons > .OptionBtn {
            font-size: 3em;
        }
        #OptionButtons > #OptionDownloadBtn > a > img {
            height: 75px;
            width: 75px;
        }
    }

    @include for-tablet-small-2-only {
        #OptionButtons > .OptionBtn {
            width: 30%;
        }
    }

    @include for-tablet-small-only {
        #OptionButtons {
           flex-direction: column;
           align-items: center;
           > .OptionBtn {
               width: 88%;
               margin-bottom: 20px;
           } 
        }
    }
</style>