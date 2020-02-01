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
import { mapActions } from 'vuex';
import Grid from '../components/Grid/Grid';
import GridCounter from '../components/Grid/GridCounter';
import GridButtons from '../components/Grid/GridButtons';
import GridOverlay from '../components/Grid/GridOverlay';
import GridPresets from '../components/Grid/GridPresets';
import CharacterList from '../components/Characters/CharacterList';
import gridMixin from '../mixins/gridMixin';

export default {
  name: 'Home',
  components: {
    Grid,
    GridCounter,
    GridButtons,
    GridOverlay,
    GridPresets,
    CharacterList
  },
  mixins: [gridMixin],
  methods: mapActions(['fetchCharacters', 'fetchPresets']),
  created(){
    this.fetchCharacters();
    this.fetchPresets();
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

  // stacks grid on top of character list
  @include for-tablet-only {
    #Home {
      flex-direction: column;
    }
    #GridButtonContainer {
      width: 4.4vw * 22;
    }
  }

  // stacks preset list on top of grid buttons (assign, save)
  @include for-tablet-small-only {
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
