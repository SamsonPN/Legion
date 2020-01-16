const state = {
    currentStat: false,
    statPositions: {
        outerGrid: {
            "51": "Abnormal Status Resistance",
            "58": "Bonus EXP",
            "134": "Critical Damage",
            "151": "Critical Rate",
            "288": "Ignore DEF",
            "305": "Boss Damage",
            "381": "Buff Duration",
            "388": "Knockback Resistance"
        },
        innerGrid: {
            "163": "STR",
            "166": "DEX",
            "183": "LUK",
            "190": "INT",
            "249": "HP",
            "256": "MP",
            "273": "M.ATT",
            "276": "ATT"
        }
    }
}

const getters = {
    currentStat: (state) => state.currentStat,
    statPositions: (state) => state.statPositions
}

const actions = {
    switchStats({ commit, getters }, newStat){
        let {currentStat, statPositions} = getters;
        if(currentStat && currentStat !== newStat){
            let statPositionsCopy = {...statPositions};
            let {innerGrid} = statPositionsCopy;
            let temp = innerGrid[currentStat];
            innerGrid[currentStat] = innerGrid[newStat];
            innerGrid[newStat] = temp;
            commit('setStatPositions', statPositionsCopy);
        }
    }
}

const mutations = {
    removeCurrentStat: (state) => state.currentStat = false,
    setCurrentStat: (state, newStat) => state.currentStat = newStat,
    setStatPositions: (state, newStatPositions) => state.statPositions = newStatPositions
}

export default {
    state,
    getters,
    actions,
    mutations
}