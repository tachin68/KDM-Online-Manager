var initial = {
	link: null
}

export default {

	state: JSON.parse(localStorage.getItem('breadcrumb') || JSON.stringify(initial)),

	mutations: {

		pushBreadcrumb (state, {rootState, result}) {
			// state.breadcrumb.push(result)
  			Object.assign(state, result)
		},

		setBreadcrumb (state) {

			Object.assign(state, initial)
			localStorage.removeItem('link')
		}
	},

	actions: {

		pushBreadcrumb ({commit, rootState}, {result}) {

			commit('pushBreadcrumb', {rootState, result})
		},

		setBreadcrumb ({commit, rootState}) {

			commit('setBreadcrumb')
		}
	}
}