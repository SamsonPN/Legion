<template>
  <div>
      <!-- <Grid /> -->
      <!-- <GridOverlay /> -->
      <!-- <div id="pieceWrapper">
          <LegionPiece charName="Aran" />
      </div> -->
  </div>
</template>

<script>
// import Grid from '../components/Grid/Grid';
// import GridOverlay from '../components/Grid/GridOverlay';
// import LegionPiece from '../components/Characters/LegionPiece';
export default {
    components: {
        // Grid,
        // GridOverlay,
        // LegionPiece
    }
}
</script>

<style scoped lang="scss">
    div {
        display: flex;
        height: 100vh;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 0;
    }

    #pieceWrapper {
        position: relative;
        z-index: 0;
        background: none;
    }

</style>