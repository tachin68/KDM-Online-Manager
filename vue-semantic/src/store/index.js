import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import settlement from './modules/settlement'
import breadcrumb from './modules/breadcrumb'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		auth,
		settlement,
		breadcrumb
	},
	strict: process.env.NODE_ENV !== 'production'
})