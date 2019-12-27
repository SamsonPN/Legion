const state = {
    characters: {}
};

const getters = {
    allCharacters: (state) => state.characters
};


const actions = {
    fetchCharacters({ commit }){
        alert('I am called!')
        fetch('http://localhost:3000/characters/')
            .then(res => res.json())
            .then(data => {
                let {id,...characters} = data; 
                commit('setCharacters', characters)
            })
            .catch(err => console.error(err))
    },
    updateCharData({ commit }, charInfo){
        commit('updateCharDB', charInfo)
    },
    saveCharData({ commit, dispatch }){
        alert('saveCharData is called!')
        let {characters} = state;
        fetch('http://localhost:3000/characters/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ characters })
        })
        .then(() => {
            dispatch('fetchCharacters');
        })
    }
}

const mutations = {
    setCharacters: (state, characters) => (state.characters = characters),
    updateCharDB: (state, charInfo) => {
        let {field, value, className, archetype} = charInfo;
        state.characters[archetype][className][field] = value;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}