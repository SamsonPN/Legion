<template>
  <div 
      :id="charName + 'Card'"
      class="CharacterCard"
      highlighted="false">
      <div>
        <p>Class: {{charName}}</p>
        <p>Level: {{level}}</p>
        <p>Effect: {{computeEffect(charName, level)}}</p> 
        <img 
            :id="charName + 'Selected'" 
            class="cardSelectedImg"
            src="../../assets/maple-leaf.svg" 
            alt="Maple Leaf"
            title="This piece is already on the board"/> 
      </div>
      <div>
        <CharacterPiece :charName="charName" />
        <CharacterRotation :charName="charName" />
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
    props: ['charName'],
    mixins: [characterCardMixin],
    computed: { 
        ...mapGetters(['charInfo']),
        level(){
            return this.charInfo[this.charName].level;
        }
    }
}
</script>

<style scoped lang="scss">
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
    }
    
    img{
        width: 65px;
        height: 65px;
        position: absolute;
        top: 0;
        right: 0;
        display: none;
        border-radius: 17.5px;
    }
</style>