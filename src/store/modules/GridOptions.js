const state = {
    gridLines: false,
    options: {}
}

function useGridOptions(options){
    for(let option in options) {
        if(options[option] !== '' && options !== 'gridLines'){
            document.documentElement.style.setProperty(option, options[option])
        }
    }
}

const getters = {
    gridLines: (state) => state.gridLines,
    options: (state) => state.options
}

const actions = {
    fetchOptions({ commit }){
        fetch('http://localhost:3000/options/')
            .then(res => res.json())
            .then(data => {
                let {options} = data;
                commit('setOptions', {...options});
                useGridOptions({...options});
                if(options.hasOwnProperty('gridLines')){
                    commit('setGridLines', options.gridLines);
                }
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
    },
    changeOptions({ commit, getters }, optionInfo){
        let {options} = getters;
        let optionsCopy = {...options};
        let {option, value} = optionInfo;
        optionsCopy[option] = value;
        commit('setOptions', optionsCopy);
    },
    toggleGridLines({ commit, dispatch, getters }){
        let {gridLines} = getters;
        dispatch('changeOptions', {
            option: 'gridLines',
            value: !gridLines
        });
        commit('setGridLines', !gridLines);
    },
    resetOptions({ commit, dispatch }){
        commit('setOptions', {});
        dispatch('saveOptions')
    }
}

const mutations = {
    setOptions: (state, options) => {state.options = options; console.log(state.options)},
    setGridLines: (state, gridLines) => state.gridLines = gridLines
}

export default {
    state,
    getters,
    actions,
    mutations
}