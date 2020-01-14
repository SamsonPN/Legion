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
        unhighlightCard(vm, charName){
            let {commit} = vm.$store;
            commit('removeCurrentCharacter');
            this.removeAllHighlights();
        }
    }
}