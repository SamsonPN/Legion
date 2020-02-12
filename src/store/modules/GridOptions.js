const state = {
    gridLines: false,
    options: {}
}

const getters = {
    gridLines: (state) => state.gridLines,
    options: (state) => state.options
}

const actions = {
    fetchOptions({ commit }){
        fetch('http://localhost:3000/options/')
            .then(res => res.json())
            .then(options => {
                commit('setOptions', {...options});
            })
    },
    saveOptions({ dispatch, getters }) {
        let {options} = getters;
        fetch('http://localhost:3000/options/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ options })
        })
            .then(() => {
                dispatch('fetchOptions');
            })
    }
}

const mutations = {
    setOptions: (state, options) => state.options = options,
    toggleGridLines: (state) => state.gridLines = !state.gridLines
}

export default {
    state,
    getters,
    actions,
    mutations
}