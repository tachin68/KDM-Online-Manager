const initial = {
	login: false,
	key: null,
	avatar: null,
	name: null
}

export default {

	state: JSON.parse(localStorage.getItem('auth') || JSON.stringify(initial)),

	mutations: {

		authLogin (state, {rootState, result}) {

  			Object.assign(state, result)
		},

		authLogout (state) {

			Object.assign(state, initial)
			localStorage.removeItem('auth')
		}
	},

	actions: {

		authLogin ({commit, rootState}, {result}) {

			commit('authLogin', {rootState, result})
		},

		authLogout ({commit, rootState}) {

			commit('authLogout')
		}
	}
}