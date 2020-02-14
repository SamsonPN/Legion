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
            id="OptionDeleteWrapper">
            <p>All of your user, preset, and character information will be deleted.</p>
            <div
                id="OptionDelete"
                @click="deleteAccount">
                DELETE ACCOUNT
            </div>
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
        },
        deleteAccount(){
            alert('WARNING: THIS WILL REMOVE ALL OF YOUR INFORMATION FROM OUR DATABASE.')
            let confirm = window.confirm("Are you sure you want to proceed? This is irreversible!")
            if(confirm) {
                let url = 'http://localhost:3000'
                window.location.href = '/';
                fetch(`${url}/presets/delete`, {
                    method: 'DELETE'
                });
                fetch(`${url}/characters/delete`, {
                    method: 'DELETE'
                });
                fetch(`${url}/options/delete`, {
                    method: 'DELETE'
                });
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
            width: 100%;
            align-self: flex-start;
            padding-left: 10px;
            font-size: 3em;
            color: red;
            border-bottom: 3px solid white;
            margin-bottom: 20px;
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
                cursor: url('../../assets/ms-cursor.png'), auto;
                z-index: 1;
                &:hover {
                    opacity: 0.75;
                }
            }
            > #GridPresets {
                flex: initial;
                width: 55%;
                font-size: 1em;
                z-index: 1;
            }
        }
    }

    #OptionDeleteWrapper {
        width: 100%;
        margin-top: 30px;
        > p, div {
            margin-left: 6.5%;
        }
        > p {
            font-size: 2em;
            margin-left: 6.5%;
            margin-bottom: 20px;
        }
    }

    #OptionDelete {
        margin-top: 20px;
        width: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 30px;
        font-size: 2em;
        background-color: red;
        color: white;
        cursor: url('../../assets/ms-cursor.png'), auto;
        &:hover {
            opacity: 0.75;
        }
    }

</style>