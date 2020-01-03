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
    #Select{
        min-height: 100vh;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    
    #WarriorSelect{ color: red; }
    #MagicianSelect{ color: #1414FF; }
    #BowmanSelect{ color: #90EE90; } 
    #ThiefSelect{ color: #4E4EE4; }
    #PirateSelect{ color: orange; }
</style>