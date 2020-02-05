import Ranks from '../../components/SelectPage/ClassSelectRanks';
const state = {
    characters: {},
    charInfo: {},
    currentCharacter: false,
    currentPreset: {},
    presets: [],
    presetNumber: 1,
};

function removeSideClass(charInfo){
    let {className, coordinates} = charInfo;
    let piece = document.getElementById(className + 'Piece');
    if(piece){
        coordinates.forEach(coordinate => {
          let cell = piece.children[coordinate.y + 2].children[coordinate.x + 2];
          cell.classList.remove('side');
        })
    }
}

const getters = {
    allCharacters: (state) => state.characters,
    charInfo: (state) => state.charInfo,
    currentCharacter: (state) => state.currentCharacter,
    currentPreset: (state) => state.currentPreset,
    presetNumber: (state) => state.presetNumber,
    presets: (state) => state.presets
};

const actions = {
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
                    commit('setCurrentPreset', data[presetNumber - 1].characters);
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
    updateAllCoordinates({ dispatch, getters }, character){
        // for charInfo, just do className and coordinates!
        let {className, coordinates} = character;
        let {currentCharacter} = getters;
        if(currentCharacter && currentCharacter.className === className){
            dispatch('updateCurrentCharCoords', coordinates);
            if(currentCharacter.position){
                dispatch('updatePresetCoords', coordinates);
            }
        }
        dispatch('updateCharInfoCoords', character);
    },
    updateCurrentCharCoords({ commit, getters }, coordinates){
        let currentCharCopy = {...getters.currentCharacter, coordinates};
        commit('setCurrentCharacter', currentCharCopy);
    },
    updateCharInfoCoords({ commit, getters }, character){
        let { className, coordinates } = character;
        let charInfoCopy = {...getters.charInfo};
        charInfoCopy[className].coordinates = coordinates;
        commit('setCharInfo', charInfoCopy);
    },
    updatePresetCoords({ commit, getters}, coordinates) {
        let {currentCharacter, currentPreset} = getters;
        let currentCharCopy = {...currentCharacter, coordinates};
        let currentPresetCopy = {...currentPreset};
        let {rowIndex, cellIndex} = currentCharacter.position;
        let position = (rowIndex * 22) + cellIndex;
        currentPresetCopy = {...currentPresetCopy, [position]: currentCharCopy};
        commit('setCurrentPreset', currentPresetCopy);
    },
    changePreset({ commit, dispatch, getters }, presetNumber){
        let oldPresetNumber = getters.presetNumber;
        if(oldPresetNumber !== presetNumber){
            let {presets} = getters;
            commit('setPresetNumber', presetNumber);
            commit('setCurrentPreset', presets[presetNumber - 1].characters);
            dispatch('resetCharInfo');
            dispatch('updateCharInfo', presets[presetNumber - 1].characters);
            commit('setStatPositions', presets[presetNumber - 1].stats);
        }
    },
    resetCharInfo({ commit, getters}){
        let charInfo = {...getters.charInfo};
        for(let char in charInfo){
            charInfo[char].position = false;
        }
        commit('setCharInfo', charInfo);
    },
    removeGridPiece({ commit, getters, dispatch }, character){
        let {className, position} = character;
        let {rowIndex, cellIndex} = position;
        let oldPosition = (rowIndex * 22) + cellIndex;
        commit('setCurrentCharacter', character);
        dispatch('removeOldPosition', oldPosition);
        character.position = false;
        commit('setCharInfo', { ...getters.charInfo, [className] : character })
        commit('removeCurrentCharacter');
    },
    insertIntoPreset({ dispatch, getters }, newPosition){
        let {currentCharacter, currentPreset} = getters;
        let oldPosition = false;
        if(currentCharacter.position) {
            let {rowIndex, cellIndex} = currentCharacter.position;
            oldPosition = (rowIndex * 22) + cellIndex;
        }
        if(currentCharacter && !currentPreset[newPosition]){
            dispatch('removeOldPosition', oldPosition);
            dispatch('addToPreset', newPosition);
            dispatch('updateCharInfo', getters.currentPreset);
        }
    },
    removeOldPosition({ commit, getters }, oldPosition){
        let isNumber = isNaN(oldPosition) ? false : true;
        if(isNumber) {
            let currentPresetCopy = {...getters.currentPreset};
            delete currentPresetCopy[oldPosition];
            commit('setCurrentPreset', currentPresetCopy);
        }
    },
    addToPreset({ commit, getters }, position){
        let {currentCharacter, currentPreset} = getters;
        let currentPresetCopy = {...currentPreset};
        currentPresetCopy[position] = currentCharacter;
        commit('setCurrentPreset', currentPresetCopy);
    },
    updateCharInfo({ commit, getters }, preset){
        let charInfo = {...getters.charInfo};
        for(let position in preset){
            let {className, coordinates} = preset[position];
            removeSideClass({...charInfo[className], className});
            charInfo[className].coordinates = coordinates;
            charInfo[className].position = position;
        }
        commit('setCharInfo', charInfo)
    },
    updateLevels({ commit, getters }, character){
        let {archetype, className, coordinates, level} = character;
        let characters = JSON.parse(JSON.stringify({...getters.allCharacters}))
        characters[archetype][className].level = level;
        characters[archetype][className].coordinates = coordinates;
        commit('setCharacters', characters)
    }
}

const mutations = {
    setCharacters: (state, characters) => state.characters = characters,
    setCharInfo: (state, charInfo) => state.charInfo = {...charInfo} ,
    setCurrentCharacter: (state, currentCharacter) => state.currentCharacter = currentCharacter,
    setCurrentPreset: (state, preset) => state.currentPreset = preset,
    setPresets: (state, presets) => state.presets = presets,
    setPresetNumber: (state, presetNumber) => state.presetNumber = presetNumber,
    removeCurrentCharacter: (state) => state.currentCharacter = false
}

export default {
    state,
    getters,
    actions,
    mutations
}