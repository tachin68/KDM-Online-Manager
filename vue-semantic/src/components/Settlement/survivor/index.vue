<template>

	<div class="ui basic segment container">

		<md-card>
			<md-card-area md-inset>
				<md-whiteframe md-tag="md-toolbar" class="md-toolbar-container" md-elevation="5">
						<div class="md-title">
							<div class="md-toolbar-container">
								<h2 class="md-headline" style="flex: 1;">Create Survivor</h2>
							</div>
						</div>
				</md-whiteframe>
				<md-card-header class="md-accent md-theme-default">
					<md-card-header-text>
						<form novalidate v-on:submit.stop.prevent="createSurvivor">
							<md-input-container class="md-accent md-theme-default">
								<md-icon>add_circle</md-icon>
								<label>Survivor Name</label>
								<md-input type="text" v-model="input.name"></md-input>
							</md-input-container>
							<md-snackbar :md-position="'bottom center'" ref="snackbar" :md-duration="5000">
								<span>Create Survivor Success.</span>
								<md-button class="md-accent" md-theme="light-blue" @click.native="$refs.snackbar.close()">OK</md-button>
							</md-snackbar>
						</form>
					</md-card-header-text>
				</md-card-header>

				<md-whiteframe md-tag="md-toolbar" class="md-toolbar-container" md-elevation="5">
					<div class="md-title">
						<div class="md-toolbar-container">
							<h2 class="md-headline" style="flex: 1;"> Survivor</h2>
						</div>
					</div>
				</md-whiteframe>
			</md-card-area>

			<md-card-content>
				<md-table>
					<md-table-header>
						<md-table-row>
							<md-table-head>Dead</md-table-head>
							<md-table-head>Name</md-table-head>
							<md-table-head>Gender</md-table-head>
							<md-table-head>Hunt Xp</md-table-head>
							<md-table-head>Gear Grid</md-table-head>
						</md-table-row>
					</md-table-header>

					<md-table-body>
						<md-table-row v-for="(item, key) in survivors">
							<md-table-cell v-if="item.Dead">Dead</md-table-cell>
							<md-table-cell v-else></md-table-cell>
							<md-table-cell><router-link :to="settlementId+'/'+key"><b>{{ item.Name }}</b></router-link></md-table-cell>
							<md-table-cell v-if="item.Gender === ''"></md-table-cell>
							<md-table-cell v-if="item.Gender === '0'">F</md-table-cell>
							<md-table-cell v-if="item.Gender === '1'">M</md-table-cell>
							<md-table-cell>{{ item.Xp }}</md-table-cell>
							<md-table-cell><router-link :to="'geargrid/'+settlementId+'/'+key"><b>Gear Grid</b></router-link></md-table-cell>
						</md-table-row>
					</md-table-body>
				</md-table>
			</md-card-content>
		</md-card>

		<!-- <form class="ui secondary inverted black form segment" v-on:submit.stop.prevent="createSurvivor">
			<h3 class="ui header">
				<img src="https://firebasestorage.googleapis.com/v0/b/kd-monster-online-sheet.appspot.com/o/lantern_48x48.png?alt=media&token=fb21135c-4a90-403b-b84c-dfdf04496f0e" class="ui image">
				<div class="content">Create Survivor</div>
			</h3>
			<div class="field">
				<div class="ui action right labeled inverted icon input">
					<input type="text" placeholder="Survivor Name" v-model="input.name">
					<a class="ui inverted icon button" type="submit"><i class="icons"><i class="users icon"></i><i class="inverted corner add icon"></i></i></a>
				</div>
			</div>
		</form> -->
		<!-- <pre>
			{{survivors}}
		</pre> -->
		<!-- <table class="ui inverted selectable striped fixed unstackable table" style="cursor:pointer;">
			<thead>
				<tr>
					<th>Dead</th>
					<th>Name</th>
					<th>Gender</th>
					<th>Hunt Xp</th>
					<th>Gear Grid</th>
				</tr>
			</thead>
			<tbody>
				<tr v-if="survivors" v-for="(item, key) in survivors">
					<td>{{ item.Status.dead ? 'Dead' : '' }}</td>
					<td><router-link :to="settlementId+'/'+key" style="color:#fff; font-weight: bold;">{{ item.Name }}</router-link></td>
					<td v-if="item.Gender === ''"></td>
					<td v-if="item.Gender === '0'">Female</td>
					<td v-if="item.Gender === '1'">Male</td>
					<td>{{ item.xp }}</td>
					<td><router-link :to="'geargrid/'+settlementId+'/'+key" style="color:#fff; font-weight: bold;">Gear Grid</router-link></td>
					<td class="right aligned"><a class="ui button inverted small red circular icon" v-on:click="deleteItem(key)"><i class="remove user icon"></i></a></td>
				</tr>
			</tbody>
		</table> -->

	</div>

</template>

<script>

	import { mapState } from 'vuex'

	export default {

		data () {

			return {
				input: {
					name: ''
				},
				settlementId: this.$route.params.key,
				success : 0,
				survivors: {}
			}
		},

		computed: {
			...mapState(['auth'])
		},

		mounted () {
			window.document.title = 'Survivor'
			this.getSurvivor()
		},

		methods: {

			getSurvivor () {

				firebase.database().ref('settlementSurvivor').child(this.$route.params.key).on('value', function(snapshot) {

					this.survivors = snapshot.val()

				}.bind(this));

			},

			createSurvivor () {
				// this.success = 1
				// input['owner'] = { key: this.auth.key, name: this.auth.name }
				// input['owner'] = this.auth.name
				var input = this.input
				var survivor = firebase.database().ref('settlementSurvivor').child(this.$route.params.key).push(this.survivor())

				// firebase.database().ref('settlementSurvivor').child(survivor.key).push(this.survivorLocation())
				firebase.database().ref('survivorCourage').child(survivor.key).update(this.survivorCourage())
				firebase.database().ref('survivorDisorders').child(survivor.key).update(this.survivorDisorders())
				firebase.database().ref('survivorFightingArts').child(survivor.key).update(this.survivorFightingArts())
				firebase.database().ref('survivorUnderstanding').child(survivor.key).update(this.survivorUnderstanding())
				firebase.database().ref('survivorGearGrid').child(survivor.key).update(this.survivorGearGrid())
				this.input = ''
				this.$refs.snackbar.open();
			},

			survivorGearGrid() {
				return {
					slot1: "",
					slot2: "",
					slot3: "",
					slot4: "",
					slot5: "",
					slot6: "",
					slot7: "",
					slot8: "",
					slot9: "",
				}
			},

			survivor() {
				return {
					'Additional Notes': "",
					Abilities: {
						note: "",
						status: true
					},
					Gender: "",
					Xp: 0,
					// Head: {
					// 	def: 0,
					// 	H: 0
					// },
					// Arms: {
					// 	def: 0,
					// 	L: 0,
					// 	H: 0
					// },
					// Body: {
					// 	def: 0,
					// 	L: 0,
					// 	H: 0
					// },
					// Waist: {
					// 	def: 0,
					// 	L: 0,
					// 	H: 0
					// },
					// Legs: {
					// 	def: 0,
					// 	L: 0,
					// 	H: 0
					// },
					Impairments: {
						note: "",
						'skip Next Hunt': false
					},
					Name: this.input.name ? this.input.name : "Unnamed Survivor",
					Insanity: 0,
					Movement: 5,
					Accuracy: 0,
					Strength: 0,
					Evasion: 0,
					Luck: 0,
					Speed: 0,
					Dead: false,
					Spend: true,
					Bleeding: 0,
					Surname: "",
					Survial: 1,
					'Weapon Proficiency': {
						type: "None",
						xp: 0
					}
				}
			},

			survivorCourage() {
				return {
					Matchmaker: {
						detail: "Spend 1 endeavor to trigger Intimacy story event.",
						status: false
					},
					Prepared: {
						detail: "Add hunt XP to your roll when determining a straggler.",
						status: false
					},
					Stalwart: {
						detail: "Can't be knocked down by brain trauma or intimidate.",
						status: false
					},
					xp: 0
				}
			},

			survivorDisorders() {
				return {
					slot1: "None",
					slot2: "None",
					slot3: "None"
				}
			},

			survivorFightingArts() {
				return {
					slot1: "None",
					slot2: "None",
					slot3: "None",
					status: true
				}
			},

			survivorUnderstanding() {
				return {
					Analyze: {
						detail: "Look at the top AI card and return it to the top of the deck.",
						status: false
					},
					Explore: {
						detail: "Add +2 to your investigate results.",
						status: false
					},
					Tinker: {
						detail: "+1 endeavor when a returning survior.",
						status: false
					},
					xp: 0
				}
			},

			survivorLocation() {
				return {
					Head: {
						def: 0,
						H: 0
					},
					Arms: {
						def: 0,
						L: 0,
						H: 0
					},
					Body: {
						def: 0,
						L: 0,
						H: 0
					},
					Waist: {
						def: 0,
						L: 0,
						H: 0
					},
					Legs: {
						def: 0,
						L: 0,
						H: 0
					}
				}
			}
		}

	}
</script>