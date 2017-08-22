<template>
	<div>
		<md-snackbar :md-position="'top right'" ref="snackbar" :md-duration="3000">
			<span>Update Success.</span>
			<md-button class="md-accent" @click.native="$refs.snackbar.close()">OK</md-button>
		</md-snackbar>

		<md-card-content v-for="(name, slot) in disorSlot">
			<md-input-container class="md-accent md-theme-default">
				<label>{{ name }}</label>
				<md-select v-model="disor[slot]" @change="changeListData('survivorDisorders', slot)">
					<md-option v-for="(value, key) in disorders" :value="key">
						<span ><b>{{key}}</b></span>
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

				disor: {},
				disorSlot: { slot1: 'Slot 1', slot2: 'Slot 2', slot3: 'Slot 3' },
				disorders: {},
				checkData: {}
			}

		},

		computed: {
			...mapState(['auth'])
		},

		mounted () {

			this.getSurvivorDisorders()
			this.getListDisorders()

		},

		methods: {

			getListDisorders () {

				firebase.database().ref('disorders').on('value', function(snapshot) {

					this.disorders = snapshot.val()

				}.bind(this))

			},

			getSurvivorDisorders () {

				firebase.database().ref('survivorDisorders').child(this.surId).on('value', function(snapshot) {

					this.disor = snapshot.val()
					this.checkData = snapshot.val()

				}.bind(this))

			},

			changeListData(table, key) {
				if(this.checkData[key] != this.disor[key])
				{
					var input = {}
					input[key] = this.disor[key]

					var update = firebase.database().ref(table).child(this.surId).update(input)

					if(update) this.$refs.snackbar.open()
				}
			},

		}

	}
</script>