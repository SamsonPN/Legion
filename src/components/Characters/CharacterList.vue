<template>
    <div id="CharacterList">
        <div>
            <CharacterCard v-for="(card, index) in cards" :key="index" />
        </div>
    </div>
</template>

<script>
import CharacterCard from './CharacterCard';
export default {
    name: "CharacterList",
    components: {
        CharacterCard
    },
    data() {
        return {
            cards: [...new Array(2)].map(( x, i) => i)
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
         > div {
            overflow: auto;
            height: 100%;
            width: 100%;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 1rem;
            border-radius: 20px;
         }
         &::-webkit-scrollbar {
             width: 0;
             height: 0;
         }
    }
</style>