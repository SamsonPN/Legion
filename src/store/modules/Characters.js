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
    let duplicate = false;
    for(let position in currentPreset){
        if(currentPreset[position].className === currentCharacter.className){
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
    currentPreset: (state) => {
        return state.currentPreset
    }
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
    removeSidePieces({ commit }, coordinates){
        let {rowIndex, cellIndex} = state.currentCharacter.position;
        let legionrow = [...document.getElementsByClassName('LegionRow')];
        coordinates.forEach(coord => {
            let {x, y} = coord;
            x += cellIndex;
            y += rowIndex;
            if( y >= 0 && y < 20 &&
                x >= 0 && x < 22){
                    legionrow[y].children[x].removeAttribute('archetype');
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
        let {currentCharacter} = state;
        if(currentCharacter && currentCharacter.className === charInfo.className){
            commit('updateCurrentCharCoords', charInfo.value);
            if(currentCharacter.position){
                commit('updatePresetCoords', charInfo.value);
            }
        }
        commit('updateCoordinates', charInfo);
    },
    updatePreset({ commit }, position){
        let {currentCharacter, currentPreset} = state;
        if(currentCharacter){
            let duplicate = duplicatePresetChecker(state);
            if(currentPreset[position]){
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
        currentPresetCopy[position] = state.currentCharacter;
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
    setCurrentCharacter: (state, currentChar) => {
        let {className, position} = currentChar;
        state.currentCharacter = {...state.charInfo[className], ...{className, position}};
        console.log(state.currentCharacter);
    },
    setCurrentPreset: (state, preset) => { 
        // state.currentPreset = preset
        state.currentPreset = preset.characters;
     },
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
    },
    updatePresetCoords: (state, coordinates) => {
        let {rowIndex, cellIndex} = state.currentCharacter.position;
        let currentChar = {...state.currentCharacter, coordinates};
        state.currentPreset = {...state.currentPreset, [(rowIndex * 22) + cellIndex]: currentChar};
        // let currentPresetCopy = {...state.currentPreset};
        // currentPresetCopy[(rowIndex * 22) + cellIndex].coordinates = coordinates;
        // currentPresetCopy[(rowIndex * 22) + cellIndex] = {...currentPresetCopy[(rowIndex * 22) + cellIndex], coordinates};
        // state.currentPreset = currentPresetCopy;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}