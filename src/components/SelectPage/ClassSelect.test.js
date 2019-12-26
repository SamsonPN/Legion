import {mount} from '@vue/test-utils';
import ClassSelect from './ClassSelect';

describe('ClassSelect', () => {
    const wrapper = mount(ClassSelect, {
        propsData: {
            archetype: "Warrior",
            classList: {
                "Aran": {
                    "name": "SotaAran",
                    "level": "210"
                }
            }
        }
    })

    it('Renders ClassSelect component', () => {
        expect(wrapper.contains('#WarriorSelect')).toBe(true);
    })

    it('Renders all classes', () => {
        expect(wrapper.html()).toContain('Aran');     
    })

    it ('Contains IGN and level', () => {
        let textarea = wrapper.findAll('div > textarea');
        expect(textarea.at(0).element.value).toEqual('SotaAran')
        expect(textarea.at(1).element.value).toEqual('210');
    })
})