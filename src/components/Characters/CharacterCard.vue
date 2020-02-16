<template>
  <div 
        :id="className + 'Card'"
        class="CharacterCard"
        highlighted="false">
        <div>
            <p>Class: {{className}}</p>
            <p>Level: {{level}}</p>
            <p>Effect: {{computeEffect(className, level)}}</p> 
        </div>
        <img 
            :id="className + 'Selected'"
            :cardSelected="isSelected"
            class="cardSelectedImg"
            src="../../assets/maple-leaf.svg" 
            alt="Maple Leaf"
            title="This piece is already on the board"/> 
        <div>
            <CharacterPiece 
                :className="className"
                :position="position"
            />
            <CharacterRotation 
                :className="className"
                :position="position"
            />
        </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CharacterRotation from './CharacterRotation';
import CharacterPiece from './CharacterPiece';
import CharacterEffect from './CharacterEffect';
import characterCardMixin from '../../mixins/characterCardMixin';

export default {
    name: "CharacterCard",
    components: {
        CharacterRotation,
        CharacterPiece
    },
    props: ['className'],
    mixins: [characterCardMixin],
    computed: { 
        ...mapGetters(['charInfo', 'allCharacters', 'currentPreset']),
        level(){
            return this.charInfo[this.className].level;
        },
        position(){
            return this.charInfo[this.className].position;
        },
        isSelected(){
            return this.charInfo[this.className].position ? 'true' : 'false';
        }
    }
}
</script>

<style scoped lang="scss">
    @import '../../variables.scss';
    @import '../../mixins.scss';

    .CharacterCard {
        height: auto;
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        background-color: rgba(0,0,0, 0.9);
        border: 1px solid white;
        border-radius: 20px;
        z-index: 0;
        &[highlighted="true"]{
            border: 5px solid yellow;
        }
        > div {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            flex: 1;
            background: none;
            z-index: 0;
            > p {
                padding: 5px;
                font-size: 1.1em;
                flex: 1;
            }
        }
        > div:last-child {
            align-items: center;
        }
        > img {
            max-width: 17.5%;
            max-height: 25%;
            position: absolute;
            top: 0;
            right: 0;
            display: none;
            border-radius: 17.5px;
            &[cardSelected="true"] {
                display: block;
            }
        }
    }


    @include for-desktop-large-only {
        .CharacterCard > div {
            font-size: 1.5em;
        }
    }

    @include for-tablet-only {
        .CharacterCard {
            height: auto;
            min-width: 52.5vw;
            &:not(:last-child){
                margin-right: 5px;
            }
            > div {
                font-size: 1.15em;
            }
        }
    }

</style>