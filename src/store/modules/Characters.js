import Ranks from '../../components/SelectPage/ClassSelectRanks';
const state = {
    characters: {}
};

const getters = {
    allCharacters: (state) => state.characters,
    charInfo(){
        let {Warrior, Magician, Bowman, Thief, Pirate} = state.characters;
        return {...Warrior, ...Magician, ...Bowman, ...Thief, ...Pirate};
    }
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
    saveCharData({ commit, dispatch }){
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
    fillLevels: (state, level) => {
        let {characters} = state;
        let rankList = {
            "60": "B",
            "100": "A",
            "140": "S",
            "200": "SS",
            "250": "SSS"
        }
        for(let archetypes in characters){
            for(let _class in characters[archetypes]){
                let rank = rankList[level];
                let coordinates = ['A', 'B'].includes(rank) ? Ranks[rank] : Ranks[rank][archetypes];
                characters[archetypes][_class].level = level;
                characters[archetypes][_class].coordinates = coordinates;
            }
        }
    },
    setCharacters: (state, characters) => (state.characters = characters),
    updateCharData: (state, charInfo) => {
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