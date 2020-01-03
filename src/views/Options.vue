<template>
  <div>
      <Grid />
      <div>
          <LegionPiece :charName="charName" :charInfo="charInfo" />
      </div>
  </div>
</template>

<script>
import Grid from '../components/Grid/Grid';
import LegionPiece from '../components/Pieces/LegionPiece';
export default {
    components: {
        Grid,
        LegionPiece
    },
    data(){
        return {
            charName: 'Shade',
            charInfo: {
                "archetype": "Pirate",
                "name": "SotaShade",
                "level": "200",
                "coordinates": [
            {
                "x": 1,
                "y": 0
            },
            {
                "x": 0,
                "y": 1
            },
            {
                "x": 1,
                "y": -1
            }
        ]
            }
        }
    }
}
</script>

<style scoped lang="scss">
    div {
        display: flex;

        height: 100vh;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }
</style>