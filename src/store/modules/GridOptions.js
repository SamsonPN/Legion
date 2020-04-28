const state = {
    gridLines: false,
    options: {}
}

function useGridOptions(options){
    for(let opt in options) {
        if(options[opt] !== '' && opt !== 'gridLines'){
            let optionTextArea = document.getElementById(opt);
            document.documentElement.style.setProperty(opt, options[opt])
            if(optionTextArea){
                optionTextArea.placeholder = options[opt];
            }
        }
    }
}

const getters = {
    gridLines: (state) => state.gridLines,
    options: (state) => state.options
}

const actions = {
    fetchOptions: ({ commit }) => {
        fetch('https://legion-backend.samsonn.com/options/', {
            credentials: 'include'
        })
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
    saveOptions: ({ dispatch, getters }) => {
        let {options} = getters;
        fetch('https://legion-backend.samsonn.com/options/save', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ options })
        })
            .then(() => {
                dispatch('fetchOptions');
            })
    },
    changeOptions: ({ commit, getters }, optionInfo) => {
        let {options} = getters;
        let optionsCopy = {...options};
        let {option, value} = optionInfo;
        optionsCopy[option] = value;
        commit('setOptions', optionsCopy);
    },
    toggleGridLines: ({ commit, dispatch, getters }) => {
        let {gridLines} = getters;
        dispatch('changeOptions', {
            option: 'gridLines',
            value: !gridLines
        });
        commit('setGridLines', !gridLines);
    },
    resetOptions: ({ commit, dispatch }) => {
        commit('setOptions', {});
        dispatch('saveOptions')
    }
}

const mutations = {
    setOptions: (state, options) => state.options = options,
    setGridLines: (state, gridLines) => state.gridLines = gridLines
}

export default {
    state,
    getters,
    actions,
    mutations
}