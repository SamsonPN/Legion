<template>
  <div id="Select">
      <ClassSelect v-for="archetype in archetypes" :key="archetype.archetype" :archetype="archetype" />
  </div>
</template>

<script>
import ClassSelect from '../components/ClassSelect/ClassSelect';

export default {
    name: "Select",
    components: {
        ClassSelect
    },
    data(){
        return{
            archetypes: [
                {
                    archetype: 'Warrior',
                    classes: [
                        {
                            class: 'Dark Knight',
                            level: '',
                            name: '',
                            
                        },
                        {
                            class: 'Hero',
                            level: '',
                            name: ''
                        },
                        {
                            class: 'Paladin',
                            level: '',
                            name: ''
                        }
                    ]
                },
                {
                    archetype: 'Magician',
                    classes: [
                        {
                            class: 'Bishop',
                            level: '',
                            name: ''
                            }, 
                        {
                            class: 'Archmage F/P',
                            level: '',
                            name: ''
                        }, 
                        {
                            class: 'Archmage I/L',
                            level: '',
                            name: ''
                        }
                    ]
                }
            ]
        }
    }
}
</script>

<style scoped lang="scss">
    #Select{
        min-height: 100vh;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        > div{
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 100%;
            border-bottom: 3px solid white;
            font-size: 2em;
        }
    }
    #WarriorSelect{ color: red;}
    #MagicianSelect{ color: blue;}
    #BowmanSelect{ color: green;}
    #ThiefSelect{ color: violet;}
    #PirateSelect{ color: orange;}
</style>