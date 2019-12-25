import CharFunctions from './Characters';

describe('Mutation functions', () => {
    const {mutations} = CharFunctions;

    const state = {
        characters: {
            "Warrior": {
                "Aran": {
                    "name": "",
                    "level": ""
                }
            }
        }
    };

    it('Updates character name', () => {
        let data = {
            field: "name",
            value: "SotaAran",
            className: "Aran",
            archetype: "Warrior" 
        }
        mutations.setCharData(state, data);
        expect(state.characters.Warrior.Aran.name).toEqual('SotaAran');
    })

    it('Updates character level', () => {
        let data = {
            field: "level",
            value: "210",
            className: "Aran",
            archetype: "Warrior"
        }
        mutations.setCharData(state, data);
        expect(state.characters.Warrior.Aran.level).toEqual('210');
    })
})