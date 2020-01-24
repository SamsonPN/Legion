import CharacterEffect from '../components/Characters/CharacterEffect';

export default {
    methods: {
        activateRotationImgs(){
            let rotationImgs = [...document.getElementsByClassName('rotationImg')];
            rotationImgs.forEach(img => {
                img.setAttribute('clickable', true);
            })
        },
        clearGrid(){
            let cells = [...document.getElementsByClassName('LegionCell')];
            cells.forEach(cell => {
                cell.setAttribute('archetypeList', "");
                cell.setAttribute('archetype', "");
            })
        },
        computeEffect(charName, level){
            let {classes, effects, values} = CharacterEffect;
            let effectIndex= classes[charName];
            let {effect, type} = effects[effectIndex];
            level = parseInt(level);
            let computedEffect;
            if(isNaN(level)){
                computedEffect = effect;
            }
            else {
                let rank = this.rankCheck(parseInt(level));
                computedEffect = effect.replace('value', values[type][rank]);
            }
            return computedEffect;
        },
        getImage(charName){
            if(charName === 'Archmage Fire/Poison'){
                charName = 'FP';
            }
            else if (charName === 'Archmage Ice/Lightning'){
                charName = 'IL';
            }
            return require(`../assets/ClassIcons/${charName}.png`);
        },
        highlightCard(vm, charName){
            let {commit} = vm.$store;
            let currentChar = {
                className: charName,
                position: false
            };
            let card = document.getElementById(charName + 'Card');
            this.removeAllHighlights('CharacterCard');
            card.setAttribute('highlighted', true);
            commit('setCurrentCharacter', currentChar);
            this.reactivateCharacterCard(charName, true);
        },
        rankCheck(level){
            let rank;
            if(60 <= level && level < 100){
                rank = 'B';
            }
            else if (100 <= level && level < 140){
               rank = 'A' 
            }
            else if (140 <= level && level < 200){
                rank = 'S'
            }
            else if (200 <= level && level < 250){
                rank = 'SS'
            }
            else {
                rank = 'SSS'
            }
            return rank;
        },
        reactivateCharacterCard(className, isOnGrid){
           if(!isOnGrid){
                document.getElementById(className + 'Piece').setAttribute('draggable', true);
                document.getElementById(className + 'Selected').style.display = "none";
            }
            let rotationImgs = [...document.getElementById(className + 'Rotation').children];
            rotationImgs.forEach(img => {
                img.setAttribute('clickable', true);
            })
        },
        removeAllHighlights(element){
            let highlightedItem = [...document.getElementsByClassName(element)];
            highlightedItem.forEach(item => {
                item.setAttribute('highlighted', false);
            })
        },
        resetPieceDraggability(){
            let pieces = [...document.getElementsByClassName('piece')];
            let cardSelectedImg = [...document.getElementsByClassName('cardSelectedImg')];
            pieces.forEach(piece => {
                piece.setAttribute('draggable', true);
            })
            cardSelectedImg.forEach(img => {
                img.style.display = 'none';
            })
        },
        unhighlightCard(vm){
            let {commit} = vm.$store;
            commit('removeCurrentCharacter');
            this.removeAllHighlights('CharacterCard');
        }
    }
}