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
import { mapGetters, mapActions } from 'vuex';
import ClassSelect from '../components/SelectPage/ClassSelect';
import Bar from '../components/SelectPage/ClassSelectBar';

export default {
    name: "Select",
    components: {
        ClassSelect,
        Bar
    },
    methods: mapActions(['fetchCharacters']),
    computed: mapGetters(['allCharacters']),
    created(){
        this.fetchCharacters();
    }
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
    
    #WarriorSelect { color: var(--warrior); }
    #MagicianSelect { color: var(--magician); }
    #BowmanSelect { color: var(--bowman); } 
    #ThiefSelect { color: var(--thief); }
    #PirateSelect { color: var(--pirate); }
    #LabSelect { color: var(--lab); }
</style>