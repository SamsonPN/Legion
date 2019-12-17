import {mount} from '@vue/test-utils';
import Grid from './Grid.vue';
import GridRow from './GridRow';
import GridCells from './GridCells';


describe('Grid', () => {
    const wrapper = mount(Grid);
    
    it('Renders Grid component', () => {
        // renders the grids correctly
        expect(wrapper.contains('table')).toBe(true)
    })

    it('Renders Grid Rows', () => {
        // renders all 20 grid rows
        expect(wrapper.findAll(GridRow).length === 20).toBe(true)
    })

})