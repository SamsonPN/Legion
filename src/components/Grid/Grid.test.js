import {mount} from '@vue/test-utils';
import Grid from './Grid.vue';

describe('Grid', () => {
    const wrapper = mount(Grid);
    
    it('Renders Grid component', () => {
        // renders the grids correctly
        expect(wrapper.contains('div')).toBe(true)
    })

    it('Renders all Grid Rows and Cells', () => {
        // renders all 20 grid rows
        let row = wrapper.findAll('.LegionRow');
        let cell = row.at(0).findAll('.LegionCell');
        expect(row.length === 20).toBe(true)
        expect(cell.length === 22).toBe(true);
    })

})