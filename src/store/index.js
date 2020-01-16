import Vuex from 'vuex';
import Vue from 'vue';
import Characters from './modules/Characters';
import GridStats from './modules/GridStats';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Characters,
        GridStats
    }
})