<template>
    <div 
        id="Options">
        <div>
            <p>Customize Colors</p>
        </div>
        <div
            class="optColumn">
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

        <div
            class="optColumn">
            <div>
                    <div id="pieceWrapper">
                        <CharacterPiece 
                            draggable="false"
                            v-for="(className, archetype) in classes"
                            :key="className"
                            :className="className"
                            :option="archetype"
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
        
        <OptionButtons />
        <OptionDanger />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Overlay from '../components/Grid/GridOverlay';
import Option from '../components/OptionsPage/OptionSelect';
import OptionButtons from '../components/OptionsPage/OptionButtons';
import OptionDanger from '../components/OptionsPage/OptionDanger';
import CharacterPiece from '../components/Characters/CharacterPiece';

export default {
    name: "Options",
    components: {
        CharacterPiece,
        Overlay,
        Option,
        OptionButtons,
        OptionDanger
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
            classes: {
                'Warrior': 'Aran' ,
                'Magician': 'Luminous',
                'Bowman': 'Mercedes',
                'Thief': 'Phantom',
                'Pirate': 'Shade',
                'Enhanced Lab Piece': 'Enhanced Lab Piece'
            }
        }
    },
    methods: mapActions(['fetchCharacters', 'fetchPresets', 'fetchOptions']),
    created(){
        this.fetchCharacters(this);
        this.fetchPresets();
        this.fetchOptions();
    }
}
</script>

<style scoped lang="scss">
    @import '../mixins.scss';
    @import '../variables.scss';
    $size: 1.5vw;

    #Options {
        min-height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        background-color: rgba(0, 0, 0, 0.85);
        z-index: 0;
        color: white;
        > div:first-child {
            display: flex;
            border-bottom: 3px solid white;
            margin-bottom: 20px;
            > p {
                padding-left: 10px;
                font-size: 3em;
                background-image: linear-gradient(to right, #73c2fb, #87ceeb, #ffd700, #ffa001, #f46a4e, #73c2fb);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
        }
        > .optColumn {
            display: flex;
            justify-content: space-around;
            flex: 1;
            > div {
                display: flex;
                justify-content: center;
                flex: 1;
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

    @include for-desktop-large-only {
        #Options > div:first-of-type > p {
            font-size: 5em;
        }
        #LegionGridOverlay {
            /deep/ .LegionCellOverlay {
                font-size: 1.5em;
            }
        }
    }

    @include for-tablet-only {
        #LegionGridOverlay {
            $size: 3vw;
            max-height: $size * 20;
            max-width: $size * 22;
            margin-bottom: 20px;
            /deep/ .LegionCellOverlay {
                height: $size;
                width: $size;
            }
        }
        .optColumn {
            flex-direction: column;
        }
    }

    @include for-tablet-small-only {
        #LegionGridOverlay {
            $size: 4vw;
            max-height: $size * 20;
            max-width: $size * 22;
            margin-bottom: 20px;
            /deep/ .LegionCellOverlay {
                height: $size;
                width: $size;
            }
        }
    }

    @include for-mobile-only {
        #LegionGridOverlay {
            /deep/ .LegionCellOverlay {
                font-size: 0.5em;
            }
        }
    }

</style>