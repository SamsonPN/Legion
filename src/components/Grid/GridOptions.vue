<template>
    <div id="GridOptions">
        <div
            v-for="(optionCSS, optionDisplay) in options"
            :key="optionDisplay"
            :type="type">
            <p 
                class="optionDisplay"
                :option="optionDisplay">
                {{optionDisplay}}
                </p>
            <textarea
                @change="changeColor($event, optionCSS)"
                @keypress.enter.prevent=""
                rows="1"
                maxLength="10"
                :type="type"
                :option="optionDisplay">
            </textarea>
        </div>
        <div
            v-if="isGridOption()">
            <p class="optionDisplay">Display Grid Lines</p>
            <div 
                id="GridLineOption"
                :display="gridLines"
                @click="toggleGridLines">
                <div 
                    id="GridLineYes"
                    :display="gridLines">
                    Yes
                </div>
                <div 
                    id="GridLineNo"
                    :display="gridLines">
                    No
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
    name: 'GridOptions',
    props: ['options', 'type'],
    computed: mapGetters(['gridLines']),
    methods: {
        ...mapMutations(['toggleGridLines']),
        isGridOption(){
            return this.type === 'grid';
        },
        changeColor(e, option){
            let color = e.target.value;
            document.documentElement.style.setProperty(option, color);
        }
    }
}
</script>

<style scoped lang="scss">
    @import '../../mixins.scss';

    #GridOptions {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        > div {
            display: flex;
            flex-direction: column;
            align-items: center;
            &[type="piece"] {
                justify-content: center;
            }
        }
    }

    .optionDisplay {
        font-size: 1.5em;
    }

    textarea, textarea:focus {
        resize: none;
        outline: none;
        border-radius: 30px;
        padding: 0 10px;
        font-size: 1.5em;
        text-align: center;
        &[type="piece"] {
            margin-bottom: 30px;
        }
    }

    #GridLineOption {
        width: 77.25%;
        height: 23.5%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid white;
        border-radius: 30px;
        background-color: white;
        > div {
            height: 100%;
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: inherit;
            background-color: blue;
            cursor: pointer;
        }
    }

    #GridLineYes{
        visibility: hidden;
        &[display="true"] {
            visibility: visible;
        }
    }

    #GridLineNo{
        visibility: visible;
        &[display="true"] {
            visibility: hidden;
        }
    }


</style>