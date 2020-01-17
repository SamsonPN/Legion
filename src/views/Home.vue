<template>
  <div id="Home">
    <div class="column1">
      <Grid />
      <GridOverlay />
      <div id="GridButtonContainer">
        <GridPresets />
        <GridButtons />
      </div>
    </div>
    <div class="column2">
      <GridCounter />
      <CharacterList />
    </div>
  </div>
</template>


<script>
import Grid from '../components/Grid/Grid';
import GridCounter from '../components/Grid/GridCounter';
import GridButtons from '../components/Grid/GridButtons';
import GridOverlay from '../components/Grid/GridOverlay';
import GridPresets from '../components/Grid/GridPresets';
import CharacterList from '../components/Characters/CharacterList';

export default {
  name: 'Home',
  components: {
    Grid,
    GridCounter,
    GridButtons,
    GridOverlay,
    GridPresets,
    CharacterList
  }
}
</script>

<style scoped lang="scss">
  @import '../variables.scss';

  #Home{
    min-height: 80vh;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .column1 {
    min-height: 88vh;
    width: 49vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1vh;
    z-index: 0;
  }

  .column2{
    display: flex;
    flex-direction: column;
  }

  #GridButtonContainer {
    width: $size * 22;
    height: 5vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1vh;
  }

</style>
