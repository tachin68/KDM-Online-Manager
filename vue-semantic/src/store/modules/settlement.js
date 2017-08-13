const initial = {
	key: null,
	owner: null,
	name: null
}

export default {

	state: JSON.parse(localStorage.getItem('settlement') || JSON.stringify(initial)),

	mutations: {

		getSettlement (state, {rootState, result}) {

  			Object.assign(state, result)
		},

		setSettlementIndex (state) {

			Object.assign(state, initial)
			localStorage.removeItem('settlement')
		}
	},

	actions: {

		getSettlement ({commit, rootState}, {result}) {

			commit('getSettlement', {rootState, result})
		},

		setSettlementIndex ({commit, rootState}) {

			commit('setSettlementIndex')
		}
	}
}