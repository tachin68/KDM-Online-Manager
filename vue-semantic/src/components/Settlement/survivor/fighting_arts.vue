<template>
	<div>
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
				<md-select v-model="fa[slot]" @change="changeListData('survivorFightingArts', slot)">
					<md-option v-for="(value, key) in fighting_arts" :value="key">
						<span else><b>{{key}}</b></span>
					</md-option>
				</md-select>
			</md-input-container>
		</md-card-content>
	</div>
</template>

<script>

	import { mapState } from 'vuex'

	export default {

		props: ['surId'],

		data () {

			return {

				fa: {},
				faSlot: { slot1: 'Slot 1', slot2: 'Slot 2', slot3: 'Slot 3' },
				fighting_arts: {},
			}

		},

		computed: {
			...mapState(['auth'])
		},

		mounted () {

			this.getSurvivorFightingArts()
			this.getListFightingArts()

		},

		methods: {


			getSurvivorFightingArts () {

				firebase.database().ref('survivorFightingArts').child(this.surId).on('value', function(snapshot) {

					this.fa = snapshot.val()

				}.bind(this))

			},

			getListFightingArts () {

				firebase.database().ref('fightingArts').on('value', function(snapshot) {

					this.fighting_arts = snapshot.val()

				}.bind(this))
			}

		}

	}
</script>