<template>
  <div 
      :id="charName + 'Card'"
      class="CharacterCard">
      <div>
        <p>Class: {{charName}}</p>
        <p>Level: {{charInfo[charName].level}}</p>
        <p>
            Effect: Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p> 
      </div>
      <div>
        <LegionPiece :charName="charName" />
        <CharacterRotation :charName="charName" />
      </div> 
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CharacterRotation from './CharacterRotation';
import LegionPiece from '../Pieces/LegionPiece';

export default {
    name: "CharacterCard",
    components: {
        CharacterRotation,
        LegionPiece
    },
    props: ['charName'],
    computed: mapGetters(['charInfo'])
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
        > div {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            flex: 1;
            background: none;
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
</style>