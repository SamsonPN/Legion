import CharacterEffect from '../components/Characters/CharacterEffect';

export default {
    methods: {
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
        highlightCard(charName){
            let card = document.getElementById(charName + 'Card');
            this.removeAllHighlights('CharacterCard');
            card.setAttribute('highlighted', true);
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
        changeRotationClickability(className, isClickable){
            let rotationImgs = [...document.getElementById(className + 'Rotation').children];
            rotationImgs.forEach(img => {
                img.setAttribute('clickable', isClickable);
            });
        },
        reactivateCharacterCard(className, isOnGrid){
            if(!isOnGrid){
                 document.getElementById(className + 'Piece').setAttribute('draggable', true);
                 document.getElementById(className + 'Selected').style.display = "none";
             }
             this.changeRotationClickability(className, true);
         },
        removeAllHighlights(element){
            let highlightedItem = [...document.getElementsByClassName(element)];
            highlightedItem.forEach(item => {
                item.setAttribute('highlighted', false);
            })
        },
        deactivateCurrentCard(vm){
            let {currentCharacter} = vm.$store.getters;
            if(currentCharacter) {
                this.changeRotationClickability(currentCharacter.className, false);
            }
        },
        unhighlightCard(vm){
            let {commit} = vm.$store;
            commit('removeCurrentCharacter');
            this.removeAllHighlights('CharacterCard');
        }
    }
}