<template>
    <div id="OptionDanger">
        <p>DANGER ZONE</p>
        <div
            id="OptionPresetWrapper">
            <p>Click on a preset below to remove all grid pieces on the board.</p>
            <div>
                <GridPresets />
                <button
                    @click="resetPreset">
                    Reset Preset
                </button>
            </div>
        </div>
        <div
            id="OptionDelete">
            DELETE ACCOUNT
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import GridPresets from '../Grid/GridPresets';

export default {
    name: "OptionDanger",
    components: {
        GridPresets
    },
    computed: mapGetters(['presetNumber']),
    methods: {
        ...mapActions(['resetCurrentPreset']),
        resetPreset(){
            let confirm = window.confirm(`Reset preset number ${this.presetNumber + 1}?`);
            if(confirm) {
                this.resetCurrentPreset();
            }
        }
    }
}
</script>

<style scoped lang="scss">
    #OptionDanger {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 30px;
        > p {
            margin-left: 6.5%;
            font-size: 3em;
            color: red;
        }
    }

    #OptionPresetWrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        > p {
            font-size: 2em;
            margin-left: 6.5%;
            margin-bottom: 20px;
        }
        > div {
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 100%;
            > button {
                width: 20%;
                border: none;
                border-radius: 30px;
                font-size: 2em;
                background-color: red;
                color: white;
                cursor: pointer;
                z-index: 1;
            }
            > #GridPresets {
                flex: initial;
                width: 55%;
                font-size: 1em;
                z-index: 1;
            }
        }
    }

    #OptionDelete {
        width: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2em;
        background-color: red;
        color: white;
    }

</style>