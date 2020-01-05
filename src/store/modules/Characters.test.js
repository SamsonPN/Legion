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
        mutations.updateCharData(state, data);
        expect(state.characters.Warrior.Aran.name).toEqual('SotaAran');
    })

    it('Updates character level', () => {
        let data = {
            field: "level",
            value: "210",
            className: "Aran",
            archetype: "Warrior"
        }
        mutations.updateCharData(state, data);
        expect(state.characters.Warrior.Aran.level).toEqual('210');
    })

    it('Sets Presets', () => {
        let data = [{
            "preset": 1,
            "characters": {
                "439": {
                    "name": "",
                    "level": "250",
                    "className": "Aran",
                    "coordinates": [
                        {
                            "x": 1,
                            "y": 0
                        },
                        {
                            "x": 0,
                            "y": 1
                        },
                        {
                            "x": 1,
                            "y": 1
                        },
                        {
                            "x": 2,
                            "y": 0
                        }
                    ]
                },
            }
        }];
        mutations.setPresets(state, data);
        expect(state.presets[0].preset).toEqual(1);
        expect(state.presets[0].characters["439"].level).toEqual("250");
    })
})