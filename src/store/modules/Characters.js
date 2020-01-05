import Ranks from '../../components/SelectPage/ClassSelectRanks';
const state = {
    characters: {},
    charInfo: {},
    currentCharacter: false,
    currentPreset: {},
    presets: [],
    presetNumber: 1
};

function duplicatePresetChecker(state){
    let {currentCharacter, currentPreset} = state;
    console.log(currentCharacter.name)
    let {characters} = currentPreset;
    let duplicate = false;
    for(let position in characters){
        if(characters[position].className === currentCharacter.className){
            duplicate = true;
            break;
        }
    }
    return duplicate;
}

const getters = {
    allCharacters: (state) => state.characters,
    charInfo: (state) => state.charInfo,
    currentCharacter: (state) => state.currentCharacter,
    currentPreset: (state) => state.currentPreset
};

const actions = {
    addPreset({ dispatch }){
        // add a new preset here, and then fetch all the presets!
    },
    changePreset({ commit }){
        // change preset here!
    },
    fetchCharacters({ commit }){
        fetch('http://localhost:3000/characters/')
            .then(res => res.json())
            .then(data => {
                let {id,...characters} = data; 
                commit('setCharacters', characters)
            })
            .catch(err => console.error(err))
    },
    fetchPresets({ commit }){
        fetch('http://localhost:3000/characters/presets')
            .then(res => res.json())
            .then(data => {
                commit('setPresets', data);
                if(data.length > 0){
                    commit('setCurrentPreset', data[0]);
                }
            })
    },
    saveCharData({ dispatch }){
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
    },
    savePreset(){
        //call a fetch request to save a preset here
    },
    updateAllCoordinates({ commit, dispatch }, charInfo){
        commit('updateCoordinates', charInfo);
        let {currentCharacter} = state;
        if(currentCharacter && currentCharacter.className === charInfo.className){
            commit('updateCurrentCharCoords', charInfo.value);
        }
    },
    updatePreset({ commit }, position){
        let {currentCharacter, currentPreset} = state;
        if(currentCharacter){
            let duplicate = duplicatePresetChecker(state);
            if(currentPreset.characters[position]){
                alert('This position is already occupied!')
            }
            else if (duplicate){
                alert('This piece is already on the board')
            }
            else {
                commit('addToPreset', position);
                commit('removeCurrentCharacter');
            }
        }
    }
}

const mutations = {
    addToPreset: (state, position) => {
        let currentPresetCopy = {...state.currentPreset};
        currentPresetCopy.characters[position] = state.currentCharacter;
        state.currentPreset = currentPresetCopy;
    },
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
    removeCurrentCharacter: (state) => { state.currentCharacter = false; },
    setCharacters: (state, characters) => {
        let {Warrior, Magician, Bowman, Thief, Pirate} = characters;
        state.characters = characters
        state.charInfo = {...Warrior, ...Magician, ...Bowman, ...Thief, ...Pirate};
    },
    setCurrentCharacter: (state, charName) => {
        state.currentCharacter = {...state.charInfo[charName], ...{className: charName}};
        console.log(state.currentCharacter)
    },
    setCurrentPreset: (state, preset) => { state.currentPreset = preset },
    setPresets: (state, presets) => { state.presets = presets },
    updateCharData: (state, charInfo) => {
        let {field, value, className, archetype} = charInfo;
        state.characters[archetype][className][field] = value;
    },
    updateCoordinates: (state, charInfo) => {
        let { className, field, value } = charInfo;
        let newCharInfo = {...state.charInfo};
        newCharInfo[className][field] = value;
        state.charInfo = newCharInfo;
    },
    updateCurrentCharCoords: (state, coordinates) => {
        let currentCharCopy = {...state.currentCharacter, coordinates};
        state.currentCharacter = currentCharCopy;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}