const state = {
    currentStat: false,
    statPositions: {}
}

const getters = {
    currentStat: (state) => state.currentStat,
    statPositions: (state) => state.statPositions
}

const actions = {
    switchStats({ commit, getters }, newStat){
        let {currentStat, statPositions} = getters;
        if(currentStat && currentStat !== newStat){
            let innerGrid = {...statPositions.innerGrid};
            let temp = innerGrid[currentStat];
            innerGrid[currentStat] = innerGrid[newStat];
            innerGrid[newStat] = temp;
            commit('setStatPositions', {...statPositions, innerGrid});
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