import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

import schema from './modules/schema'

Vue.use(Vuex);

export const store = new Vuex.Store({
    actions,
    getters,
    modules: {
        schema
    },
    strict: true
})