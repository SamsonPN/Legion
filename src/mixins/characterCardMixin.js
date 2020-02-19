import CharacterEffect from '../components/Characters/CharacterEffect';

export default {
    methods: {
        computeEffect(className, level){
            let {classes, effects, values} = CharacterEffect;
            let effectIndex= classes[className];
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
        getImage(className){
            if(className === 'Archmage Fire/Poison'){
                className = 'fp';
            }
            else if (className === 'Archmage Ice/Lightning'){
                className = 'il';
            }
            return require(`../assets/ClassIcons/${className.toLowerCase()}.png`);
        },
        highlightCard(className){
            let card = document.getElementById(className + 'Card');
            this.removeAllHighlights('CharacterCard');
            card.setAttribute('highlighted', true);
            this.reactivateCharacterCard(className, true);
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
             this.changeRotationClickability(className, true);
         },
         changeRotationClickability(className, isClickable){
            let rotationImgs = [...document.getElementById(className + 'Rotation').children];
            rotationImgs.forEach(img => {
                img.setAttribute('clickable', isClickable);
            });
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