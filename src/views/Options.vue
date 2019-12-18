<template>
  <div>
      <UniversalPiece />
  </div>
</template>

<script>
import UniversalPiece from '../components/Pieces/UniversalPiece';
export default {
    components: {
        UniversalPiece
    }
}
</script>

<style scoped lang="scss">
    div {
        height: 100vh;
        width: 100%;
        background-color: black;
    }
</style>