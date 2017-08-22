<template>
	<div class="ui basic segment container">
		<md-snackbar :md-position="'top right'" ref="snackbar" :md-duration="3000">
			<span>Update Success.</span>
			<md-button class="md-accent" @click.native="$refs.snackbar.close()">OK</md-button>
		</md-snackbar>

		<md-card md-with-hover>
			<md-card-area md-inset>
				<md-whiteframe md-tag="md-toolbar" class="md-toolbar-container">
					<div class="md-title">
						<div class="md-toolbar-container">
							<h2 class="md-headline" style="flex: 1;">Quarries</h2>
						</div>
					</div>
				</md-whiteframe>

				<md-card-content>
					<md-list>
						<md-list-item v-for="(row, key) in input.monsters">
							<md-checkbox v-model="row.status"></md-checkbox>

							<md-input-container md-inline>
								<label>Monster Name</label>
								<md-input v-model="row.name"></md-input>
							</md-input-container>
						</md-list-item>
					</md-list>
				</md-card-content>
			</md-card-area>
		</md-card>

		<md-card md-with-hover>
			<md-card-area md-inset>
				<md-whiteframe md-tag="md-toolbar" class="md-toolbar-container">
					<div class="md-title">
						<div class="md-toolbar-container">
							<h2 class="md-headline" style="flex: 1;">Quarries</h2>
						</div>
					</div>
				</md-whiteframe>

				<md-card-content>
					<md-list>
						<md-list-item v-for="(row, key) in input.nemesis">
								<md-checkbox v-model="row.status"></md-checkbox>
	      					<!-- <div class="md-list-text-container"> -->
								<md-input-container md-inline>
									<label>Monster name</label>
									<md-input v-model="row.name"></md-input>
								</md-input-container>
							<!-- </div> -->
								<md-layout><md-checkbox v-model="row.LV1">LV1</md-checkbox></md-layout>
								<md-layout><md-checkbox v-model="row.LV2">LV2</md-checkbox></md-layout>
								<md-layout><md-checkbox v-model="row.LV3">LV3</md-checkbox></md-layout>
						</md-list-item>
					</md-list>
				</md-card-content>
			</md-card-area>
		</md-card>

	</div>
</template>

<script>

	import { mapState } from 'vuex'

	export default {

		data () {

			return {
				input: {
					monsters: {
						xxx: {
							name: 'White Lion',
							status: false
						}
					},
					nemesis: {
						xxx: {
							name: 'Butcher',
							LV1: false,
							LV2: false,
							LV3: false,
							status: false
						}
					}
				}
			}
		},

		computed:
		{
			...mapState(['auth'])
		},

		mounted ()
		{
			// this.getSettlementMonsters()
		},

		methods:
		{
			getSettlementMonsters()
			{
				// firebase.database().ref('settlementMonsters').child(this.$route.params.key).on('value', function(snapshot) {

				// 	this.input = snapshot.val()

				// }.bind(this))
			},

			addYear()
			{
				// for (var i = 1; i <= 5; i++) {
				// 	this.timeline.push({year: (this.timeline.length + 1), status: false, event: '', hunt: ''})
				// }
			},

			save()
			{
				// var update = firebase.database().ref('settlementMonsters').child(this.$route.params.key).set(this.timeline)
				// if(update) this.$refs.snackbar.open()
			}
		}

	}
</script>