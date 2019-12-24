<template>
  <div class="CharacterCard">
      <!-- <p>Name</p>
      <p>Class</p>
      <p>Level</p>
      <p>Effect</p> -->
      <LegionPiece />
  </div>
</template>

<script>
import LegionPiece from '../Pieces/LegionPiece';

export default {
    name: "CharacterCard",
    components: {
        LegionPiece
    }
}
</script>

<style scoped lang="scss">
    .CharacterCard {
        height: 30vh;
        width: 100%;
        position: relative;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        background-color: rgba(0,0,0, 0.9);
        border: 1px solid white;
        border-radius: 20px;
        > p {
            text-align: center;
        }
    }
</style>