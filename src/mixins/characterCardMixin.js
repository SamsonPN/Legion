export default {
    methods: {
        test: (value) => {
            alert(value);
        },
        getImage: (charName) => {
            if(charName === 'Archmage Fire/Poison'){
                charName = 'FP';
            }
            else if (charName === 'Archmage Ice/Lightning'){
                charName = 'IL';
            }
            return require(`../assets/ClassIcons/${charName}.png`);
        }
    }
}