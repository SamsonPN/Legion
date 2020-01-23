<template>
  <div id="Select">
      <Bar />
      <ClassSelect
        v-for="(classList, archetype) in allCharacters" 
        :key="archetype" 
        :archetype="archetype"
        :classList="classList" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ClassSelect from '../components/SelectPage/ClassSelect';
import Bar from '../components/SelectPage/ClassSelectBar';

export default {
    name: "Select",
    components: {
        ClassSelect,
        Bar
    },
    computed: mapGetters(['allCharacters']),
}
</script>

<style scoped lang="scss">
    @import '../variables.scss';
    @import '../mixins.scss';

    #Select {
        min-height: 100vh;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    
    #WarriorSelect { color: $warrior }
    #MagicianSelect { color: $magician; }
    #BowmanSelect { color: $bowman; } 
    #ThiefSelect { color: $thief; }
    #PirateSelect { color: $pirate; }
    #LabSelect { color: $lab; }
</style>