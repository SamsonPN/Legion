export default {
    methods: {
        getImage: (charName) => {
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
            this.removeAllHighlights();
            card.setAttribute('highlighted', true);
            commit('setCurrentCharacter', currentChar);
            this.reactivateCharacterCard(charName, true);
        },
        reactivateCharacterCard(className, isOnGrid){
           if(!isOnGrid){
            document.getElementById(className + 'Piece').setAttribute('draggable', true);
            document.getElementById(className + 'Selected').style.display = "none";
            }
            else{
                let rotationImgs = [...document.getElementById(className + 'Rotation').children];
                rotationImgs.forEach(img => {
                    img.setAttribute('clickable', true);
                })
            }
        },
        removeAllHighlights(){
            let cards = [...document.getElementsByClassName('CharacterCard')];
            cards.forEach(card => {
                card.setAttribute('highlighted', false);
            })
        },
        unhighlightCard(vm, charName){
            let {commit} = vm.$store;
            commit('removeCurrentCharacter');
            this.removeAllHighlights();
        }
    }
}