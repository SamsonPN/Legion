<template>
  <div class="CharacterCard">
      <div>
        <p>{{charName}}</p>
        <p>{{charInfo.name}}</p>
        <p>{{charInfo.level}}</p>
      </div>
      <!-- <p>Effect</p> MAYBE-->
      <div>
        <LegionPiece :charInfo="charInfo" :charName="charName"/>
      </div>
  </div>
</template>

<script>
import LegionPiece from '../Pieces/LegionPiece';

export default {
    name: "CharacterCard",
    components: {
        LegionPiece
    },
    props: ['charInfo', 'charName']
}
</script>

<style scoped lang="scss">
    .CharacterCard {
        height: 25vh;
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: row-reverse;
        background-color: rgba(0,0,0, 0.9);
        border: 1px solid white;
        border-radius: 20px;
        > div {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            flex: 1;
            background: none;
            > p {
                padding: 5px;
                font-size: 1.5em;
                text-align: center;
                flex: 1;
            }
        }
    }
</style>