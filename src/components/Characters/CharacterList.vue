<template>
    <div id="CharacterList">
        <div id="CardContainer">
            <CharacterCard 
                v-for="(character, name) in activeCharInfo" 
                :key="name"
                :charInfo="{character, name}"
                :charName="name"
                />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CharacterCard from './CharacterCard';

export default {
    name: "CharacterList",
    components: {
        CharacterCard
    },
    computed: {
        ...mapGetters(['charInfo']),
        activeCharInfo(){
            let {charInfo} = this;
            let activeCharInfo = {};
            for(let classes in charInfo){
                if(charInfo[classes].level !== ""){
                    activeCharInfo[classes] = charInfo[classes];
                }
            }
            return activeCharInfo;
        }
    }
}
</script>

<style scoped lang="scss">
    #CharacterList {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 90vh;
        width: 49vw;
        margin-top: 1vh;
        color: white;
        scrollbar-width: none;
        -ms-overflow-style: none;
        z-index: 0;
         > div {
            overflow: auto;
            height: 100%;
            width: 100%;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 1rem;
            border-radius: 20px;
             &:empty{
                 background-color: rgba(0, 0, 0, 0.5);
                 border: 1px solid white;
                 border-radius: 20px;
             }
         }
         &:-webkit-scrollbar {
             width: 0;
             height: 0;
         }
    }
</style>