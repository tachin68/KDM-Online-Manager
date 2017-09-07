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
							<h2 class="md-headline" style="flex: 1;">Random</h2>
						</div>
					</div>
				</md-whiteframe>

				<md-card-content>
				<button @click="marge(arr)" class="ui button blue">Marge Array And Shuffle</button>
				<input type="text" v-model="value">
				<button @click="test(arrayMarge, value)" class="ui button red">Select Value And Remove from Array</button>
				<br>
				Input : {{value}}<br>
				arr : {{arr}}<br>
				arr2 : {{arr2}}<br>
				Count : {{arrayMarge.length}}<br>
				<pre>
					{{ arrayMarge }}
				</pre>
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
				arr: ["2", "11", "37", "42"],
				arr2: ["3", "1", "7", "142"],
				arrayMarge: [],
				value: 0
			}
		},

		computed:
		{
			...mapState(['auth'])
		},

		mounted ()
		{
			// this.getSettlementTimeline()
		},

		methods:
		{
			test(arr, value) {

				var index = arr.indexOf(value)
				if (index >= 0) arr.splice(index, 1)

				this.arrayMarge = arr
			},

			marge(array1) {
				var arr = array1.concat(this.arr2)
				arr = this.shuffle(arr)
				this.arrayMarge = arr
			},

			shuffle(array) {
				var currentIndex = array.length, temporaryValue, randomIndex;

				// While there remain elements to shuffle...
				while (0 !== currentIndex)
				{
					// Pick a remaining element...
					randomIndex = Math.floor(Math.random() * currentIndex);
					currentIndex -= 1;

					// And swap it with the current element.
					temporaryValue = array[currentIndex];
					array[currentIndex] = array[randomIndex];
					array[randomIndex] = temporaryValue;
				}

				return array
			}
		}

	}
</script>