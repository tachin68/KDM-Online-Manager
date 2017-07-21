<template>

	<div class="ui basic segment container">

		<md-card>
			<md-card-area md-inset>
				<md-whiteframe md-tag="md-toolbar" class="md-toolbar-container" md-elevation="5">
						<div class="md-title">
							<div class="md-toolbar-container">
								<h2 class="md-headline" style="flex: 1;">{{ settlementName }} Settlement</h2>
							</div>
						</div>
				</md-whiteframe>

				<md-list>
					<md-list-item>
						<md-icon>account_balance</md-icon>
						<span>Inovations</span>

						<md-list-expand>
							<md-list>
								<md-list-item class="md-inset">World</md-list-item>
								<md-list-item class="md-inset">Americas</md-list-item>
								<md-list-item class="md-inset">Europe</md-list-item>
							</md-list>
						</md-list-expand>
					</md-list-item>

					<md-list-item>
						<md-icon>my_location</md-icon>
						<span>Locations</span>

						<md-list-expand>
							<md-list v-for="(value, key) in locations" v-if="value">
								<md-list-item class="md-inset"><router-link :to="'settlement/location/'+key">{{ key }}</router-link></a></md-list-item>
							</md-list>
						</md-list-expand>
					</md-list-item>

					<md-list-item v-if="stroage" v-on:click="getSettlementStorage">
						<md-icon>store_mall_directory</md-icon>
						<span>Storage</span>

						<md-list-expand style="padding:1rem;">

							<div class="ui six stackable inverted item menu">
								<span class="item" v-for="(value, key) in stroage"><h4>{{ key }} : {{ value }}</h4></span>
							</div>

							<div class="ui internally celled grid">
								<div class="row"  v-for="item in itemCount">
									<div class="fourteen wide column">
										<label>{{ item.name }}</label> - <span v-for="(value, key) in item.type"> {{ value }}</span>
									</div>
									<div class="two wide column">
										<h4>{{ item.value }}</h4>
									</div>
								</div>
							</div>
						</md-list-expand>
					</md-list-item>

					<md-list-item>
						<md-icon>shopping_basket</md-icon>
						<span>Shop</span>
					</md-list-item>
				</md-list>
			</md-card-area>
		</md-card>

		<router-link :to="'storage/'+id" class="ui red button">Storage's {{ settlementName }}</router-link>
		<router-link :to="'survivors/'+id" class="ui red button">Create Survivor</router-link>

	</div>
</template>


<script>

	import { mapState } from 'vuex'

	export default {

		data () {

			return {
				id: this.$route.params.key,
				settlementName: '',
				locations: {},
				stroage: {},
				itemCount: {}
			}
		},

		computed: {
			...mapState(['auth'])
		},

		mounted () {

			$('.ui.dropdown').dropdown()
			$('.ui.accordion').accordion()

			this.getSettlement()
			this.getSettlementLocation()
		},

		methods: {

			getSettlement () {

				firebase.database().ref('settlement').child(this.auth.key).child(this.$route.params.key).on('value', function(snapshot) {

					window.document.title = snapshot.val().name
					this.settlementName = snapshot.val().name

				}.bind(this));

			},

			getSettlementLocation () {
				// this.url = document.URL
				firebase.database().ref('settlementLocation').child(this.$route.params.key).on('value', function(snapshot) {
					// console.log(snapshot.val())
					this.locations = snapshot.val()

				}.bind(this))
			},

			getSettlementStorage () {

				firebase.database().ref('settlementStorage').child(this.$route.params.key).child('Resource').on('value', function(snapshot) {

					var itemCount = []
					var type = { 'Bone':0, 'Hide':0, 'Organ':0, 'Scrap':0, 'Iron':0, 'Herb':0 }

					$.each(snapshot.val() , function (key, value) {

						if(key != 'Monster Resource') {
							$.each(value , function (keys, values) {

								if(values.count) itemCount.push({name: keys, type: values.type, value: values.count})

								$.each(values.type , function (key2, value2) {

									if(key2 == 'bone')  type.Bone += values.count
									if(key2 == 'hide')  type.Hide += values.count
									if(key2 == 'organ')  type.Organ += values.count
									if(key2 == 'scrap')  type.Scrap += values.count
									if(key2 == 'iron')  type.Iron += values.count
									if(key2 == 'herb')  type.Herb += values.count
								})
							})
						} else {
							$.each(value , function (keys, valus) {

								$.each(valus , function (key2, value2) {

									if(value2.count) itemCount.push({name: key2, value: value2.count})

									$.each(value2.type , function (key3, value3) {

										if(key3 == 'bone')  type.Bone += value2.count
										if(key3 == 'hide')  type.Hide += value2.count
										if(key3 == 'organ')  type.Organ += value2.count
										if(key3 == 'scrap')  type.Scrap += value2.count
										if(key3 == 'iron')  type.Iron += value2.count
										if(key3 == 'herb')  type.Herb += value2.count
									})
								})
							})
						}
					})

					this.stroage = type
					this.itemCount = itemCount
					// console.log(this.itemCount)


				}.bind(this))
			}
		}

	}
</script>