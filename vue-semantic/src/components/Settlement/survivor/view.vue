<template>

	<div :class="{'ui basic segment container':true, 'loading': survivor.loading}">

		<md-card v-if="!survivor.loading" >

			<md-snackbar :md-position="'top right'" ref="snackbar" :md-duration="3000">
				<span>Update Success.</span>
				<md-button class="md-accent" md-theme="light-blue" @click.native="$refs.snackbar.close()">OK</md-button>
			</md-snackbar>

			<md-card-area md-inset>
				<md-whiteframe md-tag="md-toolbar" class="md-toolbar-container" md-elevation="5">
						<div class="md-title">
							<div class="md-toolbar-container">
								<h2 class="md-headline" style="flex: 1;">{{ title }}</h2>
							</div>
						</div>
				</md-whiteframe>
			</md-card-area>

			<md-tabs @change="changeTabs" md-navigation>
				<md-tab md-label="Stats">
					<div class="ui grid">
						<div class="sixteen wide column">
							<md-switch v-model="survivor.Dead" @change="changeSurvivorData('Dead')" class="md-accent md-theme-about">Dead</md-switch>
							<md-switch v-model="survivor.Spend" @change="changeSurvivorData('Spend')" class="md-primary md-theme-about">Spend Survival</md-switch>
						</div>
						<div class="eight wide column">
							<md-input-container class="md-accent md-theme-default">
								<label>Name</label>
								<md-input type="text" v-model.lazy="survivor.Name" @change="changeSurvivorData('Name')"></md-input>
							</md-input-container>
						</div>

						<div class="eight wide column">
							<md-input-container class="md-accent md-theme-default">
								<label>Surname</label>
								<md-input type="text" v-model.lazy="survivor.Surname" @change="changeSurvivorData('Surname')"></md-input>
							</md-input-container>
						</div>

						<div class="eight wide column">
							<md-input-container class="md-accent md-theme-default">
								<label for="survivor.Gender">Gender</label>
								<md-select name="survivor.Gender" v-model="survivor.Gender" @change="changeSurvivorData('Gender')">
									<md-option value="1">Male</md-option>
									<md-option value="0">Female</md-option>
								</md-select>
							</md-input-container>
						</div>

						<div class="eight wide column">
							<md-input-container class="md-accent md-theme-default">
								<label for="survivor.Xp">Hunt XP</label>
								<md-select name="survivor.Xp" v-model="survivor.Xp" @change="changeSurvivorData('Xp')">
									<md-option v-for="(value, key) in huntExp" :value="key">{{value}}</md-option>
								</md-select>
							</md-input-container>
						</div>

						<div class="sixteen wide column">
							<md-layout md-gutter v-for="key in objKeys">
								<md-layout>
									<md-input-container class="md-accent md-theme-default">
										<label>{{ key }}</label>
										<md-input type="text" v-model="survivor[key]"></md-input>
									</md-input-container>
								</md-layout>

								<md-layout>
									<md-button v-on:click="updateStatusCount(key, '+')" class="md-icon-button md-mini md-raised md-theme-about md-primary">
										<md-icon>add</md-icon>
									</md-button>
									<!-- <div v-on:click="updateStatusCount(key, survivor[key], '+')" class="ui tiny inverted circular blue button icon"><i class="ui plus icon"></i></div> -->

									<md-button v-on:click="updateStatusCount(key, '-')" class="md-icon-button md-mini md-raised md-theme-about md-accent">
										<md-icon>remove</md-icon>
									</md-button>
								</md-layout>
							</md-layout>
						</div>
					</div>
				</md-tab>

				<md-tab md-label="FA">
					<fighting-arts v-show="viewFightingArts" @global-event="callNotify" :surId="surId"></fighting-arts>
				</md-tab>

				<md-tab md-label="Disorders">
					<disorders v-show="viewDisorders" @global-event="callNotify" :surId="surId"></disorders>
				</md-tab>

				<md-tab md-label="Courage">
					<courage v-show="viewCourage" @global-event="callNotify" :surId="surId"></courage>
				</md-tab>

				<md-tab md-label="Understanding">
					<understanding v-show="viewUnderstanding" @global-event="callNotify" :surId="surId"></understanding>
				</md-tab>
			</md-tabs>
		</md-card>

	</div>

</template>
<script>

	import { mapState } from 'vuex'

	import fightingArts from './fighting_arts.vue'
	import disorders from './disorders.vue'
	import courage from './courage.vue'
	import understanding from './understanding.vue'

	export default {

		data () {

			return {
				activeTab : 0,
				surId: this.$route.params.surid,

				viewFightingArts: false,
				viewDisorders: false,
				viewCourage: false,
				viewUnderstanding: false,

				title: '',

				survivor: {
					loading		: true,
					'Dead'		: false,
					'Spend'		: false,
					'Name'		: '',
					'Surname'	: '',
					'Gender'	: '',
					'Xp'		: '',
					'Insanity'	: '',
					'Movement'	: '',
					'Accuracy'	: '',
					'Strength'	: '',
					'Evasion'	: '',
					'Luck'		: '',
					'Speed'		: ''
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
				objKeys : {
					'Insanity' : 'Insanity',
					'Movement' : 'Movement',
					'Accuracy' : 'Accuracy',
					'Strength' : 'Strength',
					'Evasion' : 'Evasion',
					'Luck' : 'Luck',
					'Speed' : 'Speed'
				}
			}

		},

		computed: {
			...mapState(['auth'])
		},

		mounted () {
			this.getSurvivor()
		},

		methods: {

			changeTabs(tabIndex)
			{
				switch (tabIndex) {
					case 0:
						this.viewDisorders		= false
						this.viewFightingArts	= false
						this.viewCourage		= false
						this.viewUnderstanding	= false
					break;
					case 1:
						this.viewFightingArts	= true
						this.viewDisorders		= false
						this.viewCourage		= false
						this.viewUnderstanding	= false
					break;
					case 2:
						this.viewDisorders		= true
						this.viewFightingArts	= false
						this.viewCourage		= false
						this.viewUnderstanding	= false
					break;
					case 3:
						this.viewCourage		= true
						this.viewDisorders		= false
						this.viewFightingArts	= false
						this.viewUnderstanding	= false
					break;
					case 4:
						this.viewUnderstanding	= true
						this.viewDisorders		= false
						this.viewFightingArts	= false
						this.viewCourage		= false
					break;
				}
			},

			getSurvivor () {

				firebase.database().ref('settlementSurvivor').child(this.$route.params.key).child(this.$route.params.surid).on('value', function(snapshot) {

					this.survivor = snapshot.val()

					if(this.survivor.Name || this.survivor.Surname) window.document.title = this.survivor.Name+' '+this.survivor.Surname
					if(this.survivor.Name || this.survivor.Surname) this.title = this.survivor.Name+' '+this.survivor.Surname


				}.bind(this))

			},

			updateStatusCount (key, type) {
				(type === '+') ? (this.survivor[key] += 1) : (this.survivor[key] -= 1)
				this.changeSurvivorData(key)
			},

			changeSurvivorData(key) {

				if(key) {
					var input = {}
					input[key] = this.survivor[key]
					var update = firebase.database().ref('settlementSurvivor').child(this.$route.params.key).child(this.$route.params.surid).update(input)
					// if(update) this.notify()
					if(update) this.$refs.snackbar.open()
				}
			},

			callNotify() {
				// this.notify()
				this.$refs.snackbar.open()
			},

			notify() {
				const h = this.$createElement

				this.$notify({
					title: 'Success',
					message: 'อัพเดทสำเร็จ',
					type: 'success'
				})
			}

		},

		components: { fightingArts, disorders, courage, understanding }

	}
</script>