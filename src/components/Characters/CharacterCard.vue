<template>
  <div class="CharacterCard">
      <p>Name</p>
      <p>Class</p>
      <p>Level</p>
      <p>Effect</p>
      <Piece />
  </div>
</template>

<script>
import Piece from '../Pieces/Piece';

export default {
    name: "CharacterCard",
    components: {
        Piece
    }
}
</script>

<style scoped lang="scss">
    .CharacterCard {
        height: 15vh;
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