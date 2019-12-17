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
                            ign: '',
                            
                        },
                        {
                            class: 'Hero',
                            level: '',
                            ign: ''
                        },
                        {
                            class: 'Paladin',
                            level: '',
                            ign: ''
                        }
                    ]
                },
                {
                    archetype: 'Magician',
                    classes: [
                        {
                            class: 'Bishop',
                            level: '',
                            ign: ''
                            }, 
                        {
                            class: 'Archmage F/P',
                            level: '',
                            ign: ''
                        }, 
                        {
                            class: 'Archmage I/L',
                            level: '',
                            ign: ''
                        }
                    ]
                },
                {
                    archetype: 'Bowman',
                    classes: [
                        {
                            class: 'Bow Master',
                            level: '',
                            ign: '',
                            
                        },
                        {
                            class: 'Marksman',
                            level: '',
                            ign: ''
                        },
                        {
                            class: 'Pathfinder',
                            level: '',
                            ign: ''
                        }
                    ]
                },
                {
                    archetype: 'Thief',
                    classes: [
                        {
                            class: 'Night Lord',
                            level: '',
                            ign: ''
                            }, 
                        {
                            class: 'Shadower',
                            level: '',
                            ign: ''
                        }, 
                        {
                            class: 'Dual Blade',
                            level: '',
                            ign: ''
                        }
                    ]
                },
                {
                    archetype: 'Pirate',
                    classes: [
                        {
                            class: 'Buccaneer',
                            level: '',
                            ign: ''
                            }, 
                        {
                            class: 'Corsair',
                            level: '',
                            ign: ''
                        }, 
                        {
                            class: 'Cannoneer',
                            level: '',
                            ign: ''
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
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    
    #WarriorSelect{ color: red; }
    #MagicianSelect{ color: #1414ff; }
    #BowmanSelect{ color: #90ee90; } 
    #ThiefSelect{ color: #4e4ee4; }
    #PirateSelect{ color: orange; }
</style>