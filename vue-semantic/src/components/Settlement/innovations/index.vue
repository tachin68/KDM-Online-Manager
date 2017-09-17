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
				<pre>
					{{ dex }}
				</pre>
				<div class="phone-viewport">
					<md-list class="md-theme-default md-primary">
						<md-list-item v-for="(value, name) in innovations">
							<span>{{ name }}</span>
							<md-button-toggle md-single>
								<md-button @click="getInnoConsequuence(name, value)" :class="{ 'md-primary md-icon-button md-mini md-dense' : true, 'md-toggle' : (value.status) ? true : false }">
									<md-icon md-theme="about" class="md-primary">done</md-icon>
								</md-button>

								<md-button @click="removeInnoFromDex(name, value)" :class="{ 'md-primary md-icon-button md-mini md-dense' : true, 'md-toggle' : (!value.status) ? true : false }">
									<md-icon md-theme="about" class="md-accent">close</md-icon>
								</md-button>
							</md-button-toggle>
						</md-list-item>
	<!-- 
						<md-list-item>
							<md-icon>send</md-icon> <span>Sent Mail</span>
						</md-list-item>

						<md-list-item>
							<md-icon>delete</md-icon> <span>Trash</span>
						</md-list-item>

						<md-list-item>
							<md-icon>error</md-icon> <span>Spam</span>
						</md-list-item> -->
					</md-list>
				</div>
					<!-- <pre> -->
						<!-- {{ innovations[4].property ? 'A ' : "B" }} -->
						<!-- {{ Object.keys(innovations.Language.property).length ? 'A ' : "B" }} -->
					<!-- </pre> -->
				
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
				innovations: {
					"Language" : {
						status: false,
						property: {
							encorage: true,
							s_limit: 1
						}
					},

					"Paint": {
						status: false,
						property: {
							dash: true,
						}
					},

					"Symposium": {
						status: false,
						property: {
							s_limit: 1,
						},
					},

					"Inner Lantern": {
						status: false,
						property: {
							surge: true,
						},
					},

					"Drums": {
						status: false,
						property: {}
					},

					"Hovel": {
						status: false,
						property: {
							depart: 1,
						},
					},

					"Ammonia" : {
						status: false,
						property: {
							depart: 1,
						},
					}
				},
				dex: []
			}
		},

		computed:
		{
			...mapState(['auth'])
		},

		mounted ()
		{
			// this.getInnoConsequuence("Language", {status: true, property: { encorage: true, s_limit: 1 }})
		},

		methods:
		{
			getInnoConsequuence(innoName, value)
			{
				this.addProp(value)
				firebase.database().ref('innovation').child(innoName).on('value', function(snapshot) {

					this.dex = this.dex.concat(snapshot.val().consequence)
					this.removeInnoWhenStatusTrue(innoName)
					this.sortDex()

				}.bind(this))

			},

			removeInnoFromDex(innoName, value)
			{
				var dex = this.dex
				firebase.database().ref('innovation').child(innoName).on('value', function(snapshot) {

					$.each(snapshot.val().consequence, function(key, value) {

						var index = dex.indexOf(value)
						if (index >= 0) dex.splice(index, 1)

					})

					this.addInnoWhenStatusFalse(innoName)
					this.changeStatus(value.status)
					this.dex = dex
					this.sortDex()

				}.bind(this))
			},

			addProp(row) {
				
				var settlementKey = this.$route.params.key
				var authKey = this.auth.key

				if(Object.keys(row.property).length) 
				{
					var prop = ['s_limit', 'encorage', 'dash', 'surge', 'depart']

					$.each(prop, function(key, propName) {

						if (row.property.hasOwnProperty(propName)) 
						{
							var sumVal = {value: 0}
							if(propName == "s_limit" || propName == "depart") 
							{
								// firebase.database().ref('settlement').child(authKey).child(settlementKey).child(propName).once('value', function(snapshot) 
								// {
								// 	sumVal.value = (snapshot.val().value + row.property[propName])
								// 	// console.log(snapshot.val().value)
								// 	// console.log(row.property[propName])
								// 	// console.log(snapshot.val().value + row.property[propName])
								// })
								// console.log(sumVal)

							} //else firebase.database().ref('settlement').child(authKey).child(settlementKey).child(propName).update(row.property[propName])
								firebase.database().ref('settlement').child(authKey).child(settlementKey).child(propName).update(sumVal)
							// console.log({value: row.property[propName]})
						}

					})
				}
			},

			addInnoWhenStatusFalse(innoName) {
				this.dex.push(innoName)
				this.sortDex()
			},

			removeInnoWhenStatusTrue(innoName) {
				var index = this.dex.indexOf(innoName)
				if (index >= 0) this.dex.splice(index, 1)
				this.sortDex()
			},

			sortDex() {
				this.dex.sort()
			},

			changeStatus(status) {
				status ? false : true
			}
		}

	}
</script>