<template>

	<div class="ui basic segment container">

		<md-card>
			<md-card-area md-inset>
				<md-whiteframe md-tag="md-toolbar" class="md-toolbar-container" md-elevation="5">
						<div class="md-title">
							<div class="md-toolbar-container">
								<h2 class="md-headline" style="flex: 1;">{{ title }}</h2>
							</div>
						</div>
				</md-whiteframe>
			</md-card-area>

			<md-card-content>
				<form>
					<md-snackbar :md-position="'bottom center'" ref="snackbar" :md-duration="5000">
						<span>Update Success.</span>
						<md-button class="md-accent" md-theme="light-blue" @click.native="$refs.snackbar.close()">OK</md-button>
					</md-snackbar>

					<md-switch v-model="survivor.Dead" class="md-accent md-theme-about">Dead</md-switch>
					<md-switch v-model="survivor.Spend" class="md-primary md-theme-about">Spend Survival</md-switch>
					<!-- <md-switch v-model="survivor.Spend" :value.sync="survivor.Spend" @change="changeSurvivorData('Spend')" class="md-primary md-theme-about" >Spend Survival</md-switch> -->

					<md-input-container class="md-accent md-theme-default">
						<label>Name</label>
						<md-input type="text" v-model.lazy="survivor.Name" @change="changeSurvivorData('Name')"></md-input>
					</md-input-container>

					<md-input-container class="md-accent md-theme-default">
						<label>Surname</label>
						<md-input type="text" v-model.lazy="survivor.Surname" @change="changeSurvivorData('Surname')"></md-input>
					</md-input-container>

					<md-input-container class="md-accent md-theme-default">
						<label for="survivor.Gender">Gender</label>
						<md-select name="survivor.Gender" v-model="survivor.Gender" @change="changeSurvivorData('Gender')">
							<md-option value="1">Male</md-option>
							<md-option value="0">Female</md-option>
						</md-select>
					</md-input-container>

					<md-input-container class="md-accent md-theme-default">
						<label for="survivor.Xp">Hunt XP</label>
						<md-select name="survivor.Xp" v-model="survivor.Xp" @change="changeSurvivorData('Xp')">
							<md-option v-for="(value, key) in huntExp" :value="key">{{value}}</md-option>
						</md-select>
					</md-input-container>

					<md-layout md-gutter v-for="key in objKeys">
						<md-layout>
							<md-input-container class="md-accent md-theme-default">
								<label>{{ key }}</label>
								<md-input type="text" v-model.lazy="survivor[key]" @change="changeSurvivorData(key)"></md-input>
							</md-input-container>
						</md-layout>

						<md-layout>
							<md-button v-on:click="updateStatusCount(key, survivor[key], '+')" class="md-icon-button md-mini md-raised md-theme-about md-primary">
								<md-icon>add</md-icon>
							</md-button>

							<md-button v-on:click="updateStatusCount(key, survivor[key], '-')" class="md-icon-button md-mini md-raised md-theme-about md-accent">
								<md-icon>remove</md-icon>
							</md-button>
						</md-layout>
					</md-layout>

				</form>
			</md-card-content>

			<md-card-area md-inset>
				<md-whiteframe md-tag="md-toolbar" class="md-toolbar-container" md-elevation="5">
						<div class="md-title">
							<div class="md-toolbar-container">
								<h2 class="md-headline" style="flex: 1;">Fighting Arts</h2>
							</div>
						</div>
				</md-whiteframe>
			</md-card-area>
			<md-card-content v-for="(name, slot) in faSlot">
				<md-input-container class="md-accent md-theme-default">
					<label>{{ name }}</label>
					<md-select v-model="fa[slot]" @change="changeSurvivorData2D('Fighting Arts', slot)">
						<md-option v-for="(value, key) in fighting_arts" :value="key">
							<span else><b>{{key}}</b></span>
						</md-option>
					</md-select>
				</md-input-container>
			</md-card-content>

			<md-card-area md-inset>
				<md-whiteframe md-tag="md-toolbar" class="md-toolbar-container" md-elevation="5">
						<div class="md-title">
							<div class="md-toolbar-container">
								<h2 class="md-headline" style="flex: 1;">Disorders</h2>
							</div>
						</div>
				</md-whiteframe>
			</md-card-area>
			<md-card-content v-for="(name, slot) in disorSlot">
				<md-input-container class="md-accent md-theme-default">
					<label>{{ name }}</label>
					<md-select v-model="disor[slot]" @change="changeSurvivorData2D('Disorders', slot)">
						<md-option v-for="(value, key) in disorders" :value="key">
							<span ><b>{{key}}</b></span>
						</md-option>
					</md-select>
				</md-input-container>
			</md-card-content>

			<md-card-area md-inset>
				<md-whiteframe md-tag="md-toolbar" class="md-toolbar-container" md-elevation="5">
						<div class="md-title">
							<div class="md-toolbar-container">
								<h2 class="md-headline" style="flex: 1;">Courage</h2>
							</div>
						</div>
				</md-whiteframe>
			</md-card-area>

			<md-card-content>
				<md-input-container class="md-accent md-theme-default">
					<label>Courage</label>
					<md-select v-model="courage['xp']" @change="changeSurvivorData2D('Courage', 'xp')">
						<md-option v-for="(value, key) in courageExp" :value="key">{{ value }}</md-option>
					</md-select>
				</md-input-container>

				<md-layout md-gutter v-for="(value, key) in courage">
					<md-layout>
						<md-switch v-if="key != 'xp'" v-model="courage[key]['status']" @change="changeSurvivorData3D('Courage', key, 'status')" class="md-theme-about md-primary"> {{ key }}</md-switch>
					</md-layout>
				</md-layout>
			</md-card-content>

			<md-card-area md-inset>
				<md-whiteframe md-tag="md-toolbar" class="md-toolbar-container" md-elevation="5">
						<div class="md-title">
							<div class="md-toolbar-container">
								<h2 class="md-headline" style="flex: 1;">Understanding</h2>
							</div>
						</div>
				</md-whiteframe>
			</md-card-area>

			<md-card-content>
				<md-input-container class="md-accent md-theme-default">
					<label>Understanding</label>
					<md-select v-model="understanding['xp']" @change="changeSurvivorData2D('Understanding', 'xp')">
						<md-option v-for="(value, key) in understandingExp" :value="key">{{ value }}</md-option>
					</md-select>
				</md-input-container>

				<md-layout md-gutter v-for="(value, key) in understanding">
					<md-layout>
						<md-switch v-if="key != 'xp'" v-model="understanding[key]['status']" @change="changeSurvivorData3D('Understanding', key, 'status')" class="md-theme-about md-primary"> {{ key }}</md-switch>
					</md-layout>
				</md-layout>
			</md-card-content>

		</md-card>

	</div>

</template>
<script>

	import { mapState } from 'vuex'

	export default {

		data () {

			return {
				title: '',
				dead: '',
				spend: '',
				// survivor: {},
				// survivor: {'Dead' : 'Dead', 'Spend' : 'Spend', 'Name' : 'Name', 'Surname': 'Surname', 'Gender': 'Gender', 'Xp': 'Xp'},
				survivor: {
					'Dead' : '',
					'Spend' : '',
					'Name' : '',
					'Surname': '',
					'Gender': '',
					'Xp': '',
					'Insanity' : '',
					'Movement' : '',
					'Accuracy' : '',
					'Strength' : '',
					'Evasion' : '',
					'Luck' : '',
					'Speed' : ''
				},
				courage: {
							Matchmaker: { status: false },
							Prepared: { status: false },
							Stalwart: { status: false },
							xp : 0
						},
				understanding: {
							Analyze: { status: false },
							Explore: { status: false },
							Tinker: { status: false },
							xp : 0
						},
				huntExp: {
							0 : 0,
							1 : 1,
							2 : '2 | Age 1',
							3 : 3,
							4 : 4,
							5 : 5,
							6 : '6 | Age 2',
							7 : 7,
							8 : 8,
							9 : 9,
							10 : '10 | Age 3',
							11 : 11,
							12 : 12,
							13 : 13,
							14 : 14,
							15 : '15 | Age 4',
							16 : '16 Retired',
						},
				courageExp: {
							0 : 0,
							1 : 1,
							2 : 2,
							3 : '3 | Bold',
							4 : 4,
							5 : 5,
							6 : 6,
							7 : 7,
							8 : 8,
							9 : '9 | See the Truth',
						},
				understandingExp: {
							0 : 0,
							1 : 1,
							2 : 2,
							3 : '3 | Insight',
							4 : 4,
							5 : 5,
							6 : 6,
							7 : 7,
							8 : 8,
							9 : '9 | White Secret',
						},
				objKeys : {
					'Insanity' : 'Insanity',
					'Movement' : 'Movement',
					'Accuracy' : 'Accuracy',
					'Strength' : 'Strength',
					'Evasion' : 'Evasion',
					'Luck' : 'Luck',
					'Speed' : 'Speed'
				},
				fa: {},
				disor: {},
				faSlot: { slot1: 'Slot 1', slot2: 'Slot 2', slot3: 'Slot 3' },
				disorSlot: { slot1: 'Slot 1', slot2: 'Slot 2', slot3: 'Slot 3' },
				fighting_arts: {},
				disorders: {}
			}

		},

		computed: {
			...mapState(['auth'])
		},

		mounted () {
			$('.ui.toggle.checkbox').checkbox()
			$('.ui.dropdown').dropdown()

			this.getSurvivor()
			this.getFightingArts()
			this.getDisorders()
			this.getSurvivorCourage()
			this.getSurvivorUnderstanding()
			// this.getDisorders()
			// this.getFightingArts()

		},

		methods: {

			getSurvivor1 () {

				firebase.database().ref('settlementSurvivor').child(this.$route.params.key).child(this.$route.params.surid).on('value', function(snapshot) {

					window.document.title = snapshot.val().Name
					this.title = snapshot.val().Name+' '+snapshot.val().Surname
					this.survivor = snapshot.val()

					// this.fa = snapshot.val()['Fighting Arts']
					// this.disor = snapshot.val()['Disorders']

					this.dead = snapshot.val().Dead
					this.spend = snapshot.val().Spend

					// this.courage['Matchmaker'] = snapshot.val()['Courage']['Matchmaker']
					// this.courage['Prepared'] = snapshot.val()['Courage']['Prepared']
					// this.courage['Stalwart'] = snapshot.val()['Courage']['Stalwart']
					// this.courage['xp'] = snapshot.val()['Courage']['xp']

					// this.understanding['Analyze'] = snapshot.val()['Understanding']['Analyze']
					// this.understanding['Explore'] = snapshot.val()['Understanding']['Explore']
					// this.understanding['Tinker'] = snapshot.val()['Understanding']['Tinker']
					// this.understanding['xp'] = snapshot.val()['Understanding']['xp']

				}.bind(this))

			},

			getSurvivor () {

				var settletId = this.$route.params.key
				var surId = this.$route.params.surid
				$.each(this.survivor, function(key, value) {

					firebase.database().ref('settlementSurvivor').child(settletId).child(surId).child(key).on('value', function(snapshot) {

						this.survivor[key] = snapshot.val()

						if(this.survivor.Name || this.survivor.Surname) window.document.title = this.survivor.Name+' '+this.survivor.Surname
						if(this.survivor.Name || this.survivor.Surname) this.title = this.survivor.Name+' '+this.survivor.Surname

					}.bind(this))

				}.bind(this))

			},

			getSurvivorFightingArts () {

				firebase.database().ref('settlementSurvivor').child(this.$route.params.key).child(this.$route.params.surid).child('Fighting Arts').on('value', function(snapshot) {

					this.fa = snapshot.val()

				}.bind(this))

			},

			getSurvivorDisorders () {

				firebase.database().ref('settlementSurvivor').child(this.$route.params.key).child(this.$route.params.surid).child('Disorders').on('value', function(snapshot) {

					this.disor = snapshot.val()

				}.bind(this))

			},

			getSurvivorCourage () {

				firebase.database().ref('settlementSurvivor').child(this.$route.params.key).child(this.$route.params.surid).child('Courage').on('value', function(snapshot) {

					this.courage = snapshot.val()

				}.bind(this))

			},

			getSurvivorUnderstanding () {

				firebase.database().ref('settlementSurvivor').child(this.$route.params.key).child(this.$route.params.surid).child('Understanding').on('value', function(snapshot) {

					this.understanding = snapshot.val()

				}.bind(this))

			},

			getDisorders () {

				firebase.database().ref('disorders').on('value', function(snapshot) {

					// console.log(snapshot.key)
					this.disorders = snapshot.val()

				}.bind(this))

			},

			getFightingArts () {

				firebase.database().ref('fightingArts').on('value', function(snapshot) {

					this.fighting_arts = snapshot.val()
					// console.log(this.fighting_arts)

				}.bind(this))

			},

			updateStatusCount (key, value, type) {
				value = (type === '+') ? (+value + 1) : (+value - 1)
				this.survivor[key] = value
				this.changeSurvivorData(key)
			},

			changeSurvivorData(key) {

				if(key) {
					var input = {}
					input[key] = this.survivor[key]
					var update = firebase.database().ref('settlementSurvivor').child(this.$route.params.key).child(this.$route.params.surid).update(input)
					if(update) this.notify()
					// if(update) this.$refs.snackbar.open()
				}

			},

			changeSurvivorData2D(keyNode, key) {

				if(keyNode && key) {
					var input = {}
					if(keyNode === 'Fighting Arts')
					{
						input[key] = this.fa[key]
					} else if(keyNode === 'Disorders') {
						input[key] = this.disor[key]
					} else if(keyNode === 'Courage') {
						input[key] = this.courage[key]
					} else if(keyNode === 'Understanding') {
						input[key] = this.understanding[key]
					}

					var update = firebase.database().ref('settlementSurvivor').child(this.$route.params.key).child(this.$route.params.surid).child(keyNode).update(input)
					// if(update) this.$refs.snackbar.open()
					if(update) this.notify()
				}

			},

			changeSurvivorData3D(keyNode, key, value) {

				if(keyNode && key) {
					var input = {}

					if(keyNode === 'Courage') {
						input[value] = this.courage[key]['status']
					} else if(keyNode === 'Understanding') {
						input[value] = this.understanding[key]['status']
					}

					var update = firebase.database().ref('settlementSurvivor/'+this.$route.params.key+'/'+this.$route.params.surid+'/'+keyNode+'/'+key).update(input)
					// if(update) this.$refs.snackbar.open()
					if(update) this.notify()
				}

			},

			notify() {
				const h = this.$createElement;

				this.$notify({
					title: 'Success',
					message: 'อัพเดทสำเร็จ',
					type: 'success'
				})
			}

		}

	}
</script>