import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import settlement from './modules/settlement'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		auth,
		settlement
	},
	strict: process.env.NODE_ENV !== 'production'
})