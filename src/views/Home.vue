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
  @import '../mixins.scss';

  #Home{
    min-height: 100vh;
    width: 100%;
    display: flex;
    justify-content: space-around;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .column1 {
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1.5;
    margin-top: 1vh;
    z-index: 0;
  }

  .column2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1vh;
    padding: 0 10px;
    flex: 1.25;
  }

  #GridButtonContainer {
    width: $size * 22;
    display: flex;
    justify-content: space-between;
    margin-top: 1vh;
  }

  @media only screen and (max-width: $tablet) {
    #Home {
      flex-direction: column;
    }
    #GridButtonContainer {
      width: 4.4vw * 22;
    }
  }

  @media only screen and (max-width: 578px) {
    #GridButtonContainer {
      flex-direction: column;
      > #GridPresets {
        margin-bottom: 5px;
      }
      > #GridBtnsWrapper {
        justify-content: space-between;
      }
    }
  }




</style>
