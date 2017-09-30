<template>
	<div class="ui basic segment container">
		<md-snackbar :md-position="'top right'" ref="snackbar" :md-duration="3000">
			<span>Update Success.</span>
			<md-button class="md-accent" @click.native="$refs.snackbar.close()">OK</md-button>
		</md-snackbar>

		<md-card md-with-hover style="cursor:default;">
			<md-card-area md-inset>
				<md-whiteframe md-tag="md-toolbar" class="md-toolbar-container">
					<div class="md-title">
						<div class="md-toolbar-container">
							<h2 class="md-headline" style="flex: 1;">Timeline</h2>
						</div>
					</div>
				</md-whiteframe>

				<md-card-content>
					<md-button v-if="timeline.length" type="button" class="md-raised md-primary" style="margin-left:0px;width:100%;" @click="getUncomplete(type)"><i class="md-icon material-icons">{{ text == 'show' ? 'visibility' : 'visibility_off' }}</i> {{ text }} Completed</md-button>
					<md-list class="md-theme-default md-primary">
						<md-layout md-gutter>
							<md-layout class="ui segment raised" v-for="(row, key) in timeline" md-flex-xsmall="100" md-flex-small="50" md-flex-medium="100" md-flex-large="100">
								<md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="15" md-flex-large="10">
									<md-checkbox v-model="timeline[key].status">LY{{ row.year }}</md-checkbox>
								</md-layout>
								<md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="35" md-flex-large="40">
									<md-input-container md-inline>
										<label>Event</label>
										<md-textarea v-model="row.event"></md-textarea>
									</md-input-container>
								</md-layout>
								<md-layout md-hide-xsmall md-hide-small md-flex-medium="10" md-flex-large="15"></md-layout>
								<md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="35" md-flex-large="40">
									 <md-input-container md-inline>
										<label>Hunt / Notes</label>
										<md-textarea v-model="row.hunt" ></md-textarea>
									</md-input-container>
								</md-layout>
							</md-layout>
						</md-layout>
					</md-list>
					<md-speed-dial v-if="timeline.length" md-mode="fling" class="btnOver">
						<md-button class="md-fab md-raised md-mini md-primary" md-fab-trigger>
							<md-icon md-icon-morph>close</md-icon>
							<md-icon>settings</md-icon>
						</md-button>

						<md-button @click="backToTop" style="background-color:#424242;color:rgba(255, 255, 255, .87);" class="md-fab md-mini md-clean">
							<md-icon>keyboard_arrow_up</md-icon>
						</md-button>

						<md-button @click="addYear" style="background-color:#1e88e5;color:rgba(255, 255, 255, .87);" class="md-fab md-mini md-clean">
							<md-icon>add</md-icon>
						</md-button>

						<md-button @click="save" style="background-color:#f44336;color:rgba(255, 255, 255, .87);" class="md-fab md-mini md-clean">
							<md-icon>save</md-icon>
						</md-button>
					</md-speed-dial>
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
				timeline: [],
				tl: [],
				text: 'show',
				type: 'hide'
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
				firebase.database().ref('settlementTimeline').child(this.$route.params.key).orderByChild('status').equalTo(false).on('value', function(snapshot) {

					this.timeline = snapshot.val()
					this.timeline = this.timeline.filter(function (n) { return n.status != true })
					this.tl = this.timeline


				}.bind(this))
			},

			getUncomplete(type)
			{
				if(type === 'show')
				{
					// this.timeline = this.tl
					firebase.database().ref('settlementTimeline').child(this.$route.params.key).on('value', function(snapshot) {

						this.timeline = snapshot.val()

					}.bind(this))
				} else {
					this.timeline = this.tl
				}
				this.type = this.type === 'hide' ? 'show' : 'hide'
				this.text = this.text === 'hide' ? 'show' : 'hide'
			},

			addYear()
			{
				var timeline = this.timeline

				for(var i = 1; i <= 5; i++) this.timeline.push({year: (timeline[timeline.length - 1].year + 1), status: false, event: '', hunt: ''})
				$("html, body").animate({ scrollTop: 1000000 }, 'slow');
			},

			backToTop()
			{
				$("html, body").animate({ scrollTop: 0}, 600);
			},

			save()
			{
				var update = firebase.database().ref('settlementTimeline').child(this.$route.params.key).set(this.timeline)
				if(update) this.$refs.snackbar.open()
			}
		}

	}
</script>
<style>
	.btnOver {
		position: fixed; /* Fixed/sticky position */
		bottom: 2rem; /* Place the button at the bottom of the page */
		right: 3rem; /* Place the button 30px from the right */
		z-index: 99; /* Make sure it does not overlap */
	}
</style>
