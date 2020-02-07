<template>
    <div id="CharacterList">
        <div id="CardContainer">
            <CharacterCard 
                v-for="(character, name) in activeCharInfo" 
                :key="name"
                :className="name"
                />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CharacterCard from './CharacterCard';
import CharacterCardMixin from '../../mixins/characterCardMixin';

export default {
    name: "CharacterList",
    components: {
        CharacterCard
    },
    computed: {
        ...mapGetters(['charInfo', 'currentPreset']),
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
    @import '../../variables.scss';
    @import '../../mixins.scss';

    #CharacterList {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        max-height: 100vh;
        width: 100%;
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
            grid-gap: 0.5rem;
            border-radius: 20px;
         }
         &:-webkit-scrollbar {
             width: 0;
             height: 0;
         }
    }

    @include for-desktop-only {
        #CharacterList {
            > div {
                grid-template-columns: repeat(1, 1fr);
            }
        }
    }

    @include for-tablet-only {
        #CharacterList {
            height: auto;
            > div {
                display: flex;
                height: auto;
            }
        }
    }
</style>