const initial = {
	breadcrumb: [{}]
}

export default {

	state: JSON.parse(localStorage.getItem('breadcrumb') || JSON.stringify(initial)),

	mutations: {

		getSettlement (state, {rootState, result}) {

  			Object.assign(state, result)
		},

		setSettlementIndex (state) {

			Object.assign(state, initial)
			localStorage.removeItem('breadcrumb')
		}
	},

	actions: {

		getSettlement ({commit, rootState}, {result}) {

			commit('getSettlement', {rootState, result})
		},

		setSettlementIndex ({commit, rootState}) {

			commit('breadcrumb')
		}
	}
}