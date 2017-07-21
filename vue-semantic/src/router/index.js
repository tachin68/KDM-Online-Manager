import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home/index'
import Auth from '../components/Auth/login'
import settlement from '../components/settlement/index'
import settlementView from '../components/settlement/view'
import settlementStorage from '../components/settlement/storage'
import settlementSurvivor from '../components/settlement/survivor/index'
import survivorView from '../components/settlement/survivor/view'
import survivorGearGrid from '../components/settlement/survivor/geargrid'
import resource from '../components/resource/index'
import resourceView from '../components/resource/view'
import gear from '../components/gear/index'


Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/', name: 'home', component: Home,
			meta: {
				requiresAuth: false
			}
		},
		{
			path: '/settlement', name: 'settlement', component: settlement,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/settlement/:key', name: 'settlement/:key', component: settlementView,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/settlement/storage/:key', name: 'settlement/storage/:key', component: settlementStorage,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/settlement/survivors/geargrid/:surid', name: 'settlement/geargrid/:surid', component: survivorGearGrid,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/settlement/survivors/:key', name: 'settlement/survivors/:key', component: settlementSurvivor,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/settlement/survivors/:key/:surid', name: 'settlement/survivors/:key/:surid', component: survivorView,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/resource', name: 'resource', component: resource,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/resource/:key/:show', name: 'resource/:key/:show', component: resourceView,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/gear', name: 'gear', component: gear,
			meta: {
				requiresAuth: true
			}
		},
		// {
			// path: '/login', name: 'login', component: Auth,
			// meta: {
			// 	requiresGuest: true
			// }
		// },
		{
			path: '*', redirect: {name: 'home'}
		}
	]
})

router.beforeEach((to, from, next) => {

	const isLogin = router.app.$store.state.auth.login

	if ( to.matched.some(record => record.meta.requiresGuest) && isLogin ) {
		next({name: 'settlement'})
	} else if ( to.matched.some(record => record.meta.requiresAuth) && !isLogin ) {
		next({name: 'home'})
	} else {
		next()
	}
})

export default router