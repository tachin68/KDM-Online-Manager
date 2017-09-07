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
							<h2 class="md-headline" style="flex: 1;">Innovation</h2>
						</div>
					</div>
				</md-whiteframe>

				<md-card-content>
				<button @click="getInnoConsequuence('Language')" class="ui button blue">xxx</button>
					<pre>
						{{ dex }}
					</pre>
					<!-- <md-list>
						<md-list-item v-for="(row, key) in timeline">
							<md-checkbox v-model="timeline[key].status">LY{{ row.year }}</md-checkbox>

							<md-input-container md-inline>
								<label>Event</label>
								<md-textarea v-model="row.event"></md-textarea>
							</md-input-container>

							 <md-input-container md-inline>
								<label>Hunt / Notes</label>
								<md-textarea v-model="row.hunt" ></md-textarea>
							</md-input-container>
						</md-list-item>
					</md-list>

					<md-button @click="addYear" class="md-icon-button md-raised md-accent">
						<md-icon>add</md-icon>
					</md-button>

					<md-button @click="save" md-theme="about" class="md-icon-button md-raised md-accent">
						<md-icon>save</md-icon>
					</md-button> -->
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
					innovations: [{
							name: "Language",
							status: false,
							property: {
								encorage: true,
								s_limit: 1
							},
						},

						{
							name: "Paint",
							status: false,
							property: {
								dash: true,
							},
						},

						{
							name: "Symposium",
							status: false,
							property: {
								s_limit: 1,
							},
						},

						{
							name: "Inner Lantern",
							status: false,
							property: {
								surge: true,
							},
						},

						{
							name: "Drums",
							status: false,
							property: {}
						},

						{
							name: "Hovel",
							status: false,
							property: {
								departing: 1,
							},
						},

						{
							name: "Ammonia",
							status: false,
							property: {
								departing: 1,
							},
						}
					],
				dex: []
			}
		},

		computed:
		{
			...mapState(['auth'])
		},

		mounted ()
		{
			// this.getSettlementTimeline()
		},

		methods:
		{
			getInnoConsequuence(innoName)
			{
				var dex = this.dex
				firebase.database().ref('innovation').child(innoName).on('value', function(snapshot) {

					$.each(snapshot.val().consequence, function(key, value) {
						dex.push(value)
					})

					this.dex = dex

				}.bind(this))
			}
		}

	}
</script>