<template>
    <div
        id="GridCounter">
        <p>Legion Rank: {{legionRank}}</p>
        <p>Total Level: {{totalLevels}}</p>
        <p>Members Assigned: {{currentMembers}} / {{totalMembers}}</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LegionRanks from './LegionRanks';

export default {
    name: "GridCounter",
    methods: {
        levelSort(){
            let {charInfo} = this;
            let unsortedLevels = [];
            Object.keys(charInfo).forEach(char => {
                let level = parseInt(charInfo[char].level);
                level = isNaN(level) ? 0 : level;
                unsortedLevels.push(level)
            })
            let sortedLevels = unsortedLevels.sort((a, b) => {
                return b-a;
            });
            return sortedLevels;
        }
    },
    computed: {
        ...mapGetters(['charInfo', 'currentPreset']),
        currentMembers(){
            return Object.keys(this.currentPreset).length;
        },
        totalLevels(){
            let {charInfo} = this;
            let totalLevels = 0;
            let sortedLevels = this.levelSort();
            for(let i = 0; i < 40; i++){
                totalLevels += sortedLevels[i];
            }
            return isNaN(totalLevels) ? 0 : totalLevels;
        },
        totalMembers(){
            let roundedLevel = Math.floor(this.totalLevels / 500) * 500;
            return (LegionRanks[roundedLevel] || {}).members;
        },
        legionRank(){
            let roundedLevel = Math.floor(this.totalLevels / 500) * 500;
            return (LegionRanks[roundedLevel] || {}).rankName;
        }
    }
}
</script>

<style scoped lang="scss">
    @import '../../variables.scss';

    #GridCounter {
        width: 49vw;
        border-radius: 20px;
        color: white;
        background-color: rgba(0, 0, 0, 0.85);
        padding: 5px;
        > p {
            font-size: 1.25em;
        }
    }
</style>