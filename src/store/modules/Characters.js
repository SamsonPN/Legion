const state = {
    characters: {}
};

const getters = {
    allCharacters: (state) => state.characters
};


const actions = {
    fetchCharacters({ commit }){
        fetch('http://localhost:3000/characters/')
            .then(res => res.json())
            .then(data => {
                let {id,...characters} = data; 
                commit('setCharacters', characters)
            })
            .catch(err => console.error(err))
    },
    updateCharData({  commit }, charInfo){
        commit('setCharData', charInfo)
    }
}

const mutations = {
    setCharacters: (state, characters) => (state.characters = characters),
    setCharData: (state, charInfo) => {
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