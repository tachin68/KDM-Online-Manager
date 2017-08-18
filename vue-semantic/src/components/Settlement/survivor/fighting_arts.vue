<template>
	<div>
		<md-snackbar :md-position="'top right'" ref="snackbar" :md-duration="3000">
			<span>Update Success.</span>
			<md-button class="md-accent" @click.native="$refs.snackbar.close()">OK</md-button>
		</md-snackbar>

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
				fighting_arts: {}
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
			},

			changeListData(table, key) {
				var input = {}

				input[key] = this.fa[key]

				var update = firebase.database().ref(table).child(this.surId).update(input)

				if(update) this.$refs.snackbar.open()
			},

		}

	}
</script>