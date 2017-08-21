import Vue from 'vue'
import {sync} from 'vuex-router-sync'
import store from './store'
import router from './router'
import App from './components/App'

import '../node_modules/semantic-ui/dist/semantic.min.css'
import '../src/assets/css/font-awesome.css'
import 'semantic'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/vue-material.js'

import element from '../node_modules/element-ui'
import lang from '../node_modules/element-ui/lib/locale/lang/en'
import locale from '../node_modules/element-ui/lib/locale'

// configure language
locale.use(lang)

// Vue.use(element)
Vue.use(VueMaterial)

Vue.material.registerTheme('default', {
	primary: {
		color: 'grey', hue: 800
	},
	accent: {
		color: 'blue', hue: 600
	},
	warn: {
		color: 'black', hue: 600
	},
	redd: {
		color: 'red',
		hue: 500
	}
})

Vue.material.registerTheme('about', {
	primary: {
		color: 'Deep Orange',
		hue: 500
	},
	accent: {
		color: 'red',
		hue: 500
	},
	warn: {
		color: 'red',
		hue: 900
	}
})

sync(store, router)

new Vue({
	el: '#app',
	template: '<App/>',
	components: { App },
	store,
	router
})
