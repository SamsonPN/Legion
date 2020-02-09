<template>
  <div id="Options">
      <Overlay />
      <div>
            <div
            v-for="(optionCSS, optionDisplay) in options"
            :key="optionDisplay">
                <p>{{optionDisplay}}</p>
                <textarea
                    @keypress="changeColor($event, optionCSS)"
                    rows="1"
                    maxLength="10">
                </textarea>
            </div>
      </div>
  </div>
</template>

<script>
import Overlay from '../components/Grid/GridOverlay';
export default {
    name: "Options",
    components: {
        Overlay
    },
    data(){
        return {
            options: {
            'Grid': '--primary-grid-color',
            'Grid Background': '--grid-background-color',
            'Grid Line': '--grid-line-color',
            'Outer Stat': '--outer-stat-color',
            'Inner Stat': '--inner-stat-color',
            'Warrior': '--warrior',
            'Magician': '--magician',
            'Bowman': '--bowman',
            'Thief': '--thief',
            'Pirate': '--pirate',
            'Lab': '--lab'
            }
        }
    },
    methods: {
        changeColor(e, option){
            if(e.key === 'Enter') { 
                e.preventDefault() 
            }
            let color = e.target.value;
            document.documentElement.style.setProperty(option, color);
        }
    }
}
</script>

<style scoped lang="scss">

    #Options {
        min-height: 100vh;
        width: 100%;
        display: flex;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 0;
        color: white;
        > div {
            flex: 1;
        }
        > div:last-child {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            > div {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
            }
        }
    }

    #LegionGridOverlay {
        position: static;
    }

    textarea, textarea:focus {
        resize: none;
        outline: none;
        border-radius: 30px;
        padding: 0 10px;
        font-size: 1em;
        text-align: center;
    }

    p {
        font-size: 1.5em;
    }

</style>