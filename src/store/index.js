import Vuex from 'vuex';
import Vue from 'vue';
import Characters from './modules/Characters';
import GridStats from './modules/GridStats';
import GridOptions from './modules/GridOptions';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Characters,
        GridStats,
        GridOptions
    }
})