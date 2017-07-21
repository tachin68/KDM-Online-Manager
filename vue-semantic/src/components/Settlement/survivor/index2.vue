<template>

	<div class="ui basic segment container">

		<form class="ui secondary inverted black form segment" v-on:submit.stop.prevent="createSurvivor">
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

		</form>
		<!-- <pre>
			{{survivors}}
		</pre> -->

		<table class="ui inverted selectable striped fixed unstackable table" style="cursor:pointer;">
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
					<!-- <td class="right aligned"><a class="ui button inverted small red circular icon" v-on:click="deleteItem(key)"><i class="remove user icon"></i></a></td> -->
				</tr>
			</tbody>
		</table>

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
				survivors: {}
			}
		},

		computed: {
			...mapState(['auth'])
		},

		mounted () {
			window.document.title = 'Survivor'

			this.getSurvivor()
			// this.getSettlementLocation()
		},

		methods: {

			getSurvivor () {

				firebase.database().ref('settlementSurvivor').child(this.$route.params.key).on('value', function(snapshot) {

					this.survivors = snapshot.val()

				}.bind(this));

			},

			getSettlementLocation () {
				// this.url = document.URL
				firebase.database().ref('settlementSurvivor').child(this.$route.params.key).on('value', function(snapshot) {
					// console.log(snapshot.val())
					this.locations = snapshot.val()

				}.bind(this))
			},

			createSurvivor () {

				var input = this.input
				// input['owner'] = { key: this.auth.key, name: this.auth.name }
				// input['owner'] = this.auth.name
				var survivor = firebase.database().ref('settlementSurvivor').child(this.$route.params.key).push(this.survivor())
				firebase.database().ref('survivorGearGrid').child(survivor.key).update(this.survivorGearGrid())
				this.input = ''
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
						status: 1
					},
					Accuracy: 0,
					Courage: {
						Matchmaker: {
							detail: "Spend 1 endeavor to trigger Intimacy story event",
							status: 0
						},
						Prepared: {
							detail: "Add hunt XP to your roll when determining a straggler.",
							status: 0
						},
						Stalwart: {
							detail: "Can't be knocked down by brain trauma or intimidate.",
							status: 0
						},
						xp: 0
					},
					Disorders: {
						slot1: "None",
						slot2: "None",
						slot3: "None"
					},
					Evasion: 0,
					'Fighting Arts': {
						slot1: "None",
						slot2: "None",
						slot3: "None",
						status: 1
					},
					Gender: "",
					'Hunt Xp': 0,
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
					},
					Impairments: {
						note: "",
						'skip Next Hunt': 0
					},
					Insanity: 0,
					Luck: 0,
					Movement: 5,
					Name: this.input.name ? this.input.name : "Unnamed Survivor",
					Speed: 0,
					Status: {
						dead: 0,
						'spend survial': 1,
						bleeding: 0
					},
					Strength: 0,
					Surname: "",
					Survial: 1,
					Understanding: {
						Analyze: {
							detail: "Look at the top AI card and return it to the top of the deck.",
							status: 0
						},
						Explore: {
							detail: "Add +2 to your investigate results.",
							status: 0
						},
						Tinker: {
							detail: "+1 endeavor when a returning survior.",
							status: 0
						},
						xp: 0
					},
					'Weapon Proficiency': {
						type: "None",
						xp: 0
					}
				}
			}
		}

	}
</script>