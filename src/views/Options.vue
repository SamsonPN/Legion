<template>
  <div>
      <LegionPiece />
      <Grid />
  </div>
</template>

<script>
import LegionPiece from '../components/Pieces/LegionPiece';
import Grid from '../components/Grid/Grid';

export default {
    components: {
        LegionPiece,
        Grid
    }
}
</script>

<style scoped lang="scss">
    div {
        height: 100vh;
        width: 100%;
        background-color: white;
    }
</style>