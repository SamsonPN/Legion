const state = {
    characters: []
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
                characters.Warrior.Aran.name = 'SotaAran';
                characters.Warrior.Aran.level = '210';
                commit('setCharacters', characters)
            })
            .catch(err => console.error(err))
    }
}

const mutations = {
    setCharacters: (state, characters) => (state.characters = characters)
}

export default {
    state,
    getters,
    actions,
    mutations
}