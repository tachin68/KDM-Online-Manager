<template>
	<div>
		<md-snackbar :md-position="'top right'" ref="snackbar" :md-duration="3000">
			<span>Update Success.</span>
			<md-button class="md-accent" @click.native="$refs.snackbar.close()">OK</md-button>
		</md-snackbar>

		<md-card-content>
			<md-input-container class="md-accent md-theme-default">
				<label>Courage</label>
				<md-select v-model="courage['xp']" @change="changeListData('survivorCourage', 'xp')">
					<md-option v-for="(value, key) in courageExp" :value="key">{{ value }}</md-option>
				</md-select>
			</md-input-container>

			<md-layout md-gutter v-for="(value, key) in courage">
				<md-layout>
					<md-radio v-if="key != 'xp'" :id="key" :name="key" md-value="true" v-model="courage[key]['status']" @change="changeListData3D('survivorCourage', key)" class="md-theme-about md-primary">{{ key }}</md-radio>
				</md-layout>
			</md-layout>
		</md-card-content>
	</div>
</template>

<script>

	import { mapState } from 'vuex'

	export default {

		props: ['surId'],

		data () {

			return {

				courage: {
					Matchmaker: { status: false },
					Prepared: { status: false },
					Stalwart: { status: false },
					xp : 0
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
				}
			}

		},

		computed: {
			...mapState(['auth'])
		},

		mounted () {

			this.getSurvivorCourage()

		},

		methods: {

			getSurvivorCourage () {

				firebase.database().ref('survivorCourage').child(this.surId).on('value', function(snapshot) {

					this.courage = snapshot.val()

				}.bind(this))

			},

			changeListData(table, key) {
				var input = {}

				input[key] = this.courage[key]

				var update = firebase.database().ref(table).child(this.surId).update(input)
				// if(update) this.notify()
				// if(update) this.$refs.snackbar.open()

			},

			changeListData3D(table, key) {
				var input = {}
				var update = ''

				update = this.foreachUpdate(table, key, this.surId, ['Matchmaker', 'Prepared', 'Stalwart'])

				if(update) this.$refs.snackbar.open()
			},

			foreachUpdate(table, key, surId, arr) {
				var input = {}
				var update = ''

				$.each(arr, function (index, value) {

					input['status'] = (value == key) ? true : false;
					update = firebase.database().ref(table).child(surId).child(value).update(input)

					if(update) this.$refs.snackbar.open()
				})

				return update
			}
		}

	}
</script>