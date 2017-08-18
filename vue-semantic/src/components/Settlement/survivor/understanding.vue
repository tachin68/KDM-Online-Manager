<template>
	<div>
		<md-snackbar :md-position="'top right'" ref="snackbar" :md-duration="3000">
			<span>Update Success.</span>
			<md-button class="md-accent" @click.native="$refs.snackbar.close()">OK</md-button>
		</md-snackbar>

		<md-card-content>
			<md-input-container class="md-accent md-theme-default">
				<label>Understanding</label>
				<md-select v-model="understanding['xp']" @change="changeListData('survivorUnderstanding', 'xp')">
					<md-option v-for="(value, key) in understandingExp" :value="key">{{ value }}</md-option>
				</md-select>
			</md-input-container>

			<md-layout md-gutter v-for="(value, key) in understanding">
				<md-layout>
					<md-radio v-if="key != 'xp'" :id="key" :name="key" md-value="true" v-model="understanding[key]['status']" @change="changeListData3D('survivorUnderstanding', key)" class="md-theme-about md-primary">{{ key }}</md-radio>
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

				understanding: {
					Analyze: { status: false },
					Explore: { status: false },
					Tinker: { status: false },
					xp : 0
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
				}
			}

		},

		computed: {
			...mapState(['auth'])
		},

		mounted () {

			this.getSurvivorUnderstanding()

		},

		methods: {

			getSurvivorUnderstanding () {

				firebase.database().ref('survivorUnderstanding').child(this.surId).on('value', function(snapshot) {

					this.understanding = snapshot.val()

				}.bind(this))

			},

			changeListData(table, key)
			{
				var input = {}

				input[key] = this.understanding[key]

				var update = firebase.database().ref(table).child(this.surId).update(input)
				// if(update) this.notify()
				// if(update) this.$refs.snackbar.open()

			},

			changeListData3D(table, key)
			{
				var input = {}
				var update = ''

				update = this.foreachUpdate(table, key, this.surId, ['Analyze', 'Explore', 'Tinker'])

				if(update) this.$refs.snackbar.open()
			},

			foreachUpdate(table, key, surId, arr)
			{
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