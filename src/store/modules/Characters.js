import Ranks from '../../components/SelectPage/ClassSelectRanks';
const state = {
    characters: {},
    charInfo: {},
    currentCharacter: false,
    currentPreset: {},
    presets: [],
    presetNumber: 1,
};

const getters = {
    allCharacters: (state) => state.characters,
    charInfo: (state) => state.charInfo,
    currentCharacter: (state) => state.currentCharacter,
    currentPreset: (state) => state.currentPreset,
    presetNumber: (state) => state.presetNumber,
    presets: (state) => state.presets
};

const actions = {
    changePreset({ commit, dispatch, getters }, presetNumber){
        let oldPresetNumber = getters.presetNumber;
        if(oldPresetNumber !== presetNumber){
            let {presets} = getters;
            commit('updatePresetNumber', presetNumber);
            commit('setCurrentPreset', presets[presetNumber - 1]);
            dispatch('resetCharInfo');
            dispatch('updateCharInfo', presets[presetNumber - 1].characters);
            commit('setStatPositions', presets[presetNumber - 1].stats);
        }
    },
    fetchCharacters({ commit }){
        fetch('http://localhost:3000/characters/', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                let {id,...characters} = data;
                // creates a deep copy of character and puts it into charInfo
                let charactersCopy = JSON.parse(JSON.stringify(characters));
                let {Warrior, Magician, Bowman, Thief, Pirate, Lab} = charactersCopy;
                commit('setCharacters', characters)
                commit('setCharInfo', {...Warrior, ...Magician, ...Bowman, ...Thief, ...Pirate, ...Lab});
            })
            .catch(err => console.error(err))
    },
    fetchPresets({ commit, dispatch, getters }){
        let {presetNumber} = getters;
        fetch('http://localhost:3000/presets/', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                commit('setPresets', data);
                if(data.length > 0){
                    commit('setCurrentPreset', data[presetNumber - 1]);
                    commit('setStatPositions', data[presetNumber - 1].stats);
                    dispatch('updateCharInfo', state.currentPreset);
                }
            })
    },
    fillLevels({ commit, getters }, level){
        let characters = JSON.parse(JSON.stringify({...getters.allCharacters}))
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
                let coordinates;
                if(rank === 'SSS' && (_class === "Xenon" || _class === "Enhanced Lab Piece")){
                    coordinates = Ranks[rank][_class];
                }
                else if (rank === 'SS' && _class === "Enhanced Lab Piece"){
                    coordinates = Ranks[rank][_class];
                }
                else {
                    coordinates = ['A', 'B'].includes(rank) ? Ranks[rank] : Ranks[rank][archetypes];
                }
                characters[archetypes][_class].level = level;
                characters[archetypes][_class].coordinates = coordinates;
            }
        }
        commit('setCharacters', characters);
    },
    removeGridPiece({ commit, getters }, character){
        let {className, position} = character;
        let {rowIndex, cellIndex} = position;
        let oldPosition = (rowIndex * 22) + cellIndex;
        commit('setCurrentCharacter', character);
        commit('removeOldPosition', oldPosition);
        character.position = false;
        commit('setCharInfo', { ...getters.charInfo, [className] : character })
        commit('removeCurrentCharacter');
    },
    removeSideClass({ commit }, charInfo){
        let {className, coordinates} = charInfo;
        let piece = document.getElementById(className + 'Piece');
        if(piece){
            coordinates.forEach(coordinate => {
              let cell = piece.children[coordinate.y + 2].children[coordinate.x + 2];
              cell.classList.remove('side');
            })
        }
    },
    saveCharData({ dispatch, getters }){
        let characters = getters.allCharacters;
        fetch('http://localhost:3000/characters/save', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ characters })
        })
        .then(() => {
            dispatch('fetchCharacters');
        })
    },
    savePreset({ getters, dispatch }){
        let {currentPreset, presetNumber, statPositions} = getters;
        fetch('http://localhost:3000/presets/save', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ currentPreset, presetNumber, statPositions})
        })
            .then(() => {
                dispatch('fetchPresets');
            })
            .catch(err => console.error(err));
    },
    updateAllCoordinates({ commit }, charInfo){
        let {currentCharacter} = state;
        if(currentCharacter && currentCharacter.className === charInfo.className){
            commit('updateCurrentCharCoords', charInfo.value);
            if(currentCharacter.position){
                commit('updatePresetCoords', charInfo.value);
            }
        }
        commit('updateCharInfoCoords', charInfo);
    },
    updateCharInfo({ commit, dispatch, getters }, preset){
        let charInfo = {...getters.charInfo};
        for(let position in preset){
            let {className, coordinates} = preset[position];
            dispatch('removeSideClass', {...charInfo[className], className});
            charInfo[className].coordinates = coordinates;
            charInfo[className].position = position;
        }
        commit('setCharInfo', charInfo)
    },
    insertIntoPreset({ commit, dispatch, getters }, newPosition){
        let {currentCharacter, currentPreset} = getters;
        let {rowIndex, cellIndex} = currentCharacter.position;
        let oldPosition = (rowIndex * 22) + cellIndex;
        if(currentCharacter && !currentPreset[newPosition]){
            if(oldPosition || oldPosition === 0){
                commit('removeOldPosition', oldPosition);
            }
            commit('addToPreset', newPosition);
            commit('setCurrentCharacter', currentCharacter);
            dispatch('updateCharInfo', getters.currentPreset);
        }
    },
    resetCharInfo({ commit, getters}){
        let charInfo = {...getters.charInfo};
        for(let char in charInfo){
            charInfo[char].position = false;
        }
        commit('setCharInfo', charInfo);
    }
}

const mutations = {
    addToPreset: (state, position) => {
        let currentPresetCopy = {...state.currentPreset};
        currentPresetCopy[position] = state.currentCharacter;
        state.currentPreset = currentPresetCopy;
    },
    removeCurrentCharacter: (state) => state.currentCharacter = false,
    removeOldPosition: (state, oldPosition) => {  
        let currentPresetCopy = {...state.currentPreset};
        delete currentPresetCopy[oldPosition];
        state.currentPreset = currentPresetCopy;
    },
    setCharacters: (state, characters) => state.characters = characters,
    setCharInfo: (state, charInfo) => state.charInfo = {...charInfo} ,
    setCurrentCharacter: (state, currentChar) => {
        let {className, position} = currentChar;
        state.currentCharacter = {...state.charInfo[className], ...{className, position}};
    },
    setCurrentPreset: (state, preset) => state.currentPreset = preset.characters,
    setPresets: (state, presets) => state.presets = presets ,
    updateCharData: (state, charInfo) => {
        let {field, value, className, archetype} = charInfo;
        state.characters[archetype][className][field] = value;
    },
    updateCharInfoCoords: (state, charInfo) => {
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
    },
    updatePresetNumber: (state, presetNumber) => state.presetNumber = presetNumber
}

export default {
    state,
    getters,
    actions,
    mutations
}