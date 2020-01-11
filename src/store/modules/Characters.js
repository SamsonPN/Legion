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
    fetchPresets({ commit, dispatch }){
        fetch('http://localhost:3000/characters/presets')
            .then(res => res.json())
            .then(data => {
                commit('setPresets', data);
                if(data.length > 0){
                    commit('setCurrentPreset', data[0]);
                    dispatch('updateCharInfo', state.currentPreset);
                }
            })
    },
    removeGridPiece({ commit, dispatch }, charInfo){
        let {rowIndex, cellIndex}= charInfo.position;
        let position = (rowIndex * 22) + cellIndex;
        commit('setCurrentCharacter', charInfo);
        dispatch('removeSidePieces', state.currentPreset[position].coordinates);
        commit('removeOldPosition', position);
        commit('removeCurrentCharacter');
    },
    removeSidePieces({ commit }, coordinates){
        if(state.currentCharacter.position){
            let {position, archetype} = state.currentCharacter;
            let {rowIndex, cellIndex} = position;
            let legionrow = [...document.getElementsByClassName('LegionRow')];
            coordinates.forEach(coord => {
                let {x, y} = coord;
                x += cellIndex;
                y += rowIndex;
                if( y >= 0 && y < 20 &&
                    x >= 0 && x < 22){
                        let cell = legionrow[y].children[x];
                        let archetypeList = cell.getAttribute('archetypeList');
                        archetypeList = archetypeList.split(",").filter(el => el.length !== 0);
                        let index = archetypeList.indexOf(archetype);
                        if(index !== -1){
                            archetypeList.splice(index, 1);
                        }
                        cell.setAttribute('archetypeList', archetypeList);
                        let archetypeListLength = archetypeList.length;
                        let newArchetype;
                        if(archetypeListLength === 0){
                            newArchetype = "";
                        }
                        else if(archetypeListLength === 1){
                            newArchetype = archetypeList[0];
                        }
                        else {
                            newArchetype = "Overlap";
                        }
                        cell.setAttribute('archetype', newArchetype);
                }
            })
        }
    },
    removeSideClass({ commit }, charInfo){
        let {className, coordinates} = charInfo;
        let piece = document.getElementById(className + 'Piece');
        coordinates.forEach(coordinate => {
          let cell = piece.children[coordinate.y + 2].children[coordinate.x + 2];
          cell.classList.remove('side');
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
    updateCharInfo({ commit, dispatch }, preset){
        let charInfo = {...state.charInfo};
        for(let position in preset){
            let {className, coordinates} = preset[position];
            dispatch('removeSideClass', {...charInfo[className], className});
            charInfo[className].coordinates = coordinates;
            document.getElementById(className + 'Piece').setAttribute('draggable', false);
        }
        commit('updateCharInfo', charInfo)
    },
    insertIntoPreset({ commit, dispatch }, position){
        let {currentCharacter, currentPreset} = state;
        let {rowIndex, cellIndex} = currentCharacter.position;
        let oldPosition = (rowIndex * 22) + cellIndex;
        if(currentCharacter){
            if(!currentPreset[position]) {
                if(oldPosition || oldPosition === 0){
                    commit('removeOldPosition', oldPosition);
                    dispatch('removeSidePieces', currentCharacter.coordinates);
                }
                commit('addToPreset', position);
                commit('removeCurrentCharacter');
                dispatch('updateCharInfo', state.currentPreset);
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
    removeOldPosition: (state, oldPosition) => {  
        let currentPresetCopy = {...state.currentPreset};
        delete currentPresetCopy[oldPosition];
        state.currentPreset = currentPresetCopy;
    },
    setCharacters: (state, characters) => {
        let {Warrior, Magician, Bowman, Thief, Pirate} = characters;
        state.characters = characters
        state.charInfo = {...Warrior, ...Magician, ...Bowman, ...Thief, ...Pirate};
    },
    setCurrentCharacter: (state, currentChar) => {
        let {className, position} = currentChar;
        state.currentCharacter = {...state.charInfo[className], ...{className, position}};
    },
    setCurrentPreset: (state, preset) => { 
        state.currentPreset = preset.characters;
     },
    setPresets: (state, presets) => { state.presets = presets },
    updateCharData: (state, charInfo) => {
        let {field, value, className, archetype} = charInfo;
        state.characters[archetype][className][field] = value;
    },
    updateCharInfo: (state, charInfo) => {
        state.charInfo = charInfo;
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
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}