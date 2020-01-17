<template>
  <div id="Home">
    <div class="column1">
      <Grid />
      <GridOverlay />
      <div id="GridButtonContainer">
        <GridMenu />
        <GridButtons />
      </div>
    </div>
    <div class="column2">
      <CharacterList />
    </div>
  </div>
</template>


<script>
import Grid from '../components/Grid/Grid';
import GridOverlay from '../components/Grid/GridOverlay';
import GridMenu from '../components/Grid/GridMenu';
import GridButtons from '../components/Grid/GridButtons';
import CharacterList from '../components/Characters/CharacterList';

export default {
  name: 'Home',
  components: {
    Grid,
    GridMenu,
    GridButtons,
    GridOverlay,
    CharacterList
  }
}
</script>

<style scoped lang="scss">
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
    width: 100%;
    height: 7.5vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1vh;
  }

</style>
