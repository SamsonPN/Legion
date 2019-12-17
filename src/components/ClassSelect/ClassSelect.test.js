import {mount} from '@vue/test-utils';
import ClassSelect from './ClassSelect';

describe('ClassSelect', () => {
    const wrapper = mount(ClassSelect, {
        propsData: {
            archetype: {
                archetype: 'Warrior',
                    classes: [
                        {
                            class: 'Dark Knight',
                            level: '',
                            name: '',
                            
                        },
                        {
                            class: 'Hero',
                            level: '',
                            name: ''
                        },
                        {
                            class: 'Paladin',
                            level: '',
                            name: ''
                        }
                    ]
            }
        }
    })

    it('Renders ClassSelect component', () => {
        expect(wrapper.contains('#WarriorSelect')).toBe(true);
    })

    it('Renders all subClasses', () => {
        expect(wrapper.html()).toContain('Dark Knight');
        expect(wrapper.html()).toContain('Hero');
        expect(wrapper.html()).toContain('Paladin');        
    })
})