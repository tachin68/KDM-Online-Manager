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
							<h2 class="md-headline" style="flex: 1;">Timeline</h2>
						</div>
					</div>
				</md-whiteframe>

				<md-card-content>
					<md-list>
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
					</md-button>
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
				timeline: []
			}
		},

		computed:
		{
			...mapState(['auth'])
		},

		mounted ()
		{
			this.getSettlementTimeline()
		},

		methods:
		{
			getSettlementTimeline()
			{
				firebase.database().ref('settlementTimeline').child(this.$route.params.key).on('value', function(snapshot) {

					this.timeline = snapshot.val()

				}.bind(this))
			},

			addYear()
			{
				for (var i = 1; i <= 5; i++) {
					this.timeline.push({year: (this.timeline.length + 1), status: false, event: '', hunt: ''})
				}
			},

			save()
			{
				var update = firebase.database().ref('settlementTimeline').child(this.$route.params.key).set(this.timeline)
				if(update) this.$refs.snackbar.open()
			}
		}

	}
</script>
