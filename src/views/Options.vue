<template>
    <div id="Options">
      <div>
        <div>
            <Overlay />
        </div>
        <div>
            <Option 
                :options="gridOptions" 
                :type="'grid'"
            />
        </div>
      </div>
      <div>
          <div>
                <div id="pieceWrapper">
                    <CharacterPiece 
                    v-for="_class in classes"
                    :key="_class"
                    draggable="false"
                    :className="_class"
                />
                </div>
          </div>
          <div>
            <Option 
                :options="pieceOptions"
                :type="'piece'"
            />
          </div>
      </div>
      <div id="GridSaveContainer">
        <button
            id="GridResetBtn"
            @click="initiateResetOptions">
            Reset
        </button>
        <button 
            id="GridSaveBtn"
            @click="initiateSaveOptions">
            Save
        </button>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Overlay from '../components/Grid/GridOverlay';
import Option from '../components/Grid/GridOptions';
import CharacterPiece from '../components/Characters/CharacterPiece';

export default {
    name: "Options",
    components: {
        CharacterPiece,
        Overlay,
        Option
    },
    data(){
        return {
            gridOptions: {
            'Grid Color': '--primary-grid-color',
            'Grid Background': '--grid-background-color',
            'Grid Lines': '--grid-line-color',
            'Outer Stat': '--outer-stat-color',
            'Inner Stat': '--inner-stat-color'
            },
            pieceOptions: {
            'Warrior': '--warrior',
            'Magician': '--magician',
            'Bowman': '--bowman',
            'Thief': '--thief',
            'Pirate': '--pirate',
            'Lab': '--lab'
            },
            classes: [
                'Aran',
                'Luminous',
                'Mercedes',
                'Phantom',
                'Shade',
                'Enhanced Lab Piece'
            ]
        }
    },
    methods: {
        ...mapActions(['fetchCharacters', 'fetchOptions', 'saveOptions', 'resetOptions']),
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
    created(){
        this.fetchCharacters();
        this.fetchOptions();
    }
}
</script>

<style scoped lang="scss">
    $size: 1.5vw;

    #Options {
        min-height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        background-color: rgba(0, 0, 0, 0.85);
        z-index: 0;
        color: white;
        > div {
            display: flex;
            justify-content: space-around;
            flex: 1;
            > div {
                display: flex;
                justify-content: center;
                flex: 1;
            }
        }
        > #GridSaveContainer {
            width: 100%;
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
            > #GridResetBtn {
                background-color: red;
                color: white;
            }
            > #GridSaveBtn {
                margin-left: 5%;
            }
        }
    }

    #LegionGridOverlay {
        position: static;
        max-height: $size * 20;
        max-width: $size * 22;
        z-index: 1;
        /deep/ .LegionCellOverlay {
            height: $size;
            width: $size;
            > p {
                font-size: 0.9em;
            }
        }
    }

    p {
        font-size: 1.5em;
    }

    #pieceWrapper {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-content: center;
        align-items: center;
        > .piece {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

</style>