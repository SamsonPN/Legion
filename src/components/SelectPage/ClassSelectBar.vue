<template>
    <div id="ClassSelectBar">
        <div>  
            <span>Auto Fill Levels: </span>
            <div>
                <p @click="fillLevelHandler">60</p> 
                <span> | </span>
                <p @click="fillLevelHandler">100</p>
                <span> | </span>
                <p @click="fillLevelHandler">140</p>
                <span> | </span>
                <p @click="fillLevelHandler">200</p>
                <span> | </span>
                <p @click="fillLevelHandler">250</p>
            </div>
        </div>
        <button @click="saveChars">Save Characters</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: "ClassSelectBar",
    data(){
        return {
            levels: [60, 100, 140, 200, 250]
        }
    },
    methods: {
        ...mapActions(['saveCharData', 'fillLevels']),
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
    @import '../../mixins.scss';

    #ClassSelectBar {
        height: auto;
        width: 100%;
        display: flex;
        justify-content: space-between;
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
            white-space: pre;
            > div {
                display: flex;
                > p {
                    cursor: pointer;
                    &:hover {
                        color: gold;
                    }
                }
            }
        }
        > button {
            outline: none;
            border-radius: 20px;
            background-color: #444466;
            color: white;
            font-size: 0.75em;
            padding: 0 7.5px;
            cursor: pointer;
                &:hover {
                    opacity: 0.75;
                }
        }
    }

    @include for-tablet-only {
        #ClassSelectBar {
            flex-direction: column;
            align-items: flex-start;
        }
    }

    @include for-tablet-small-2-only {
        #ClassSelectBar > div {
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
            > div {
                width: 100%;
                justify-content: space-around;
            }
        }
    }

    @include for-mobile-only {
        #ClassSelectBar {
            align-items: center;
            > div {
                align-items: center;
                width: 100%;
                > div {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    width: 100%;
                    > p {
                        width: 100%;
                        text-align: center;
                    }
                    > span {
                        display: none;
                    }
                }
            }
        }
    }
</style>