import Vuex from 'vuex';
import Vue from 'vue';
import Characters from './modules/Characters';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Characters
    }
})