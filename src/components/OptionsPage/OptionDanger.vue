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
                let url = 'https://legion-backend.herokuapp.com'
                Promise.all([
                    fetch(`${url}/presets/delete`, { method: 'DELETE' }),
                    fetch(`${url}/characters/delete`, { method: 'DELETE' }),
                    fetch(`${url}/options/delete`, { method: 'DELETE' })
                ])
                    .then(() => {
                        this.$router.push({ name: 'login' })
                    })
            }
        }
    }
}
</script>

<style scoped lang="scss">
    @import '../../mixins.scss';

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
            justify-content: space-between;
            align-items: center;
            width: 100%;
            > button {
                border: none;
                border-radius: 30px;
                margin-right: 6.5%;
                white-space: nowrap;
                padding: 0 20px;
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
                width: 50%;
                margin-left: 6.5%;
                font-size: 1em;
                z-index: 1;
            }
        }
    }

    #OptionDeleteWrapper {
        width: 100%;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        > p, div {
            margin-left: 6.5%;
        }
        > p {
            align-self: flex-start;
            font-size: 2em;
            margin-left: 6.5%;
        }
    }

    #OptionDelete {
        display: flex;
        justify-content: center;
        align-items: center;
        align-self: flex-start;
        border-radius: 30px;
        margin: 20px 0px;
        padding: 0 10px;
        font-size: 2em;
        text-align: center;
        background-color: red;
        color: white;
        cursor: url('../../assets/ms-cursor.png'), auto;
        &:hover {
            opacity: 0.75;
        }
    }

    @include for-desktop-large-only {
        #OptionDanger > p {
            font-size: 5em;
        }
        #OptionPresetWrapper {
            > p, > div > button {
                font-size: 3.5em;
            }
        }
        #OptionDeleteWrapper {
            > p, #OptionDelete {
                font-size: 3.5em;
            }
        }
    }

    @include for-tablet-only {
        #OptionDeleteWrapper > div {
            margin-left: 0;
        }
        #OptionDelete {
            align-self: center;
            width: 87%;
        }
    }

    @include for-tablet-small-2-only {
        #OptionPresetWrapper {
            > p {
                margin-left: 0;
                padding: 0 35px;
            }
            > div {
                flex-direction: column;
                align-items: center;
                > #GridPresets, button {
                    width: 90%;
                    margin: 10px 0px;
                }
            }  
        }
        #OptionDelete {
            width: 90%;
        }
    }

    @include for-mobile-only {
        #OptionDelete {
            padding: 0px;
            letter-spacing: 0.1px;
        }
    }

</style>