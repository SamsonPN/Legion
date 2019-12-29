<template>
    <div id="ClassSelectBar">
        <div>  
            <span>Auto Fill Levels: </span>
            <p @click="fillLevelHandler">60</p> |
            <p @click="fillLevelHandler">100</p> |
            <p @click="fillLevelHandler">140</p> |
            <p @click="fillLevelHandler">200</p> |
            <p @click="fillLevelHandler">250</p>
        </div>
        <button @click="saveChars">Save Characters</button>
    </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
export default {
    name: "ClassSelectBar",
    methods: {
        ...mapActions(['saveCharData']),
        ...mapMutations(['fillLevels']),
        saveChars(){
            let SaveChars = window.confirm('Save character data?')
            if(SaveChars){
                this.saveCharData()
            }
        },
        fillLevelHandler(e){
            let level = e.target.textContent;
            let levelTextArea = document.getElementsByClassName('levelTextArea');
            [...levelTextArea].forEach(textarea => {
                textarea.value = level;
            })
            this.fillLevels(level);
        }
    }
}
</script>

<style scoped lang="scss">
    #ClassSelectBar {
        height: auto;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0px 5px;
        color: white;
        background: none;
        font: {
            size: 2em;
            weight: 200;
        }
        > div {
            display: flex;
            align-items: center;
            flex: 2;
            white-space: pre;
            > p{
                cursor: pointer;
                &:hover {
                    color: gold;
                }
            }
        }
        > button {
            outline: none;
            border-radius: 20px;
            background-color: #444466;
            color: white;
            font-size: 0.75em;
            cursor: pointer;
            flex: 0.5;
                &:hover {
                    opacity: 0.75;
                }
        }
    }
</style>