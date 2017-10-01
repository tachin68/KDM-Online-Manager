<template>

	<div class="ui basic segment container">

		<div class="ui long modal">
			<div class="header">Header</div>
			<div class="image content">
				<!-- <img class="ui small centered rounded image" src="http://semantic-ui.com/images/wireframe/square-image.png"> -->
				<div class="description">
					<p><img class="ui centered rounded image" src="http://semantic-ui.com/images/wireframe/square-image.png"></p>
					<p><img class="ui centered rounded image" src="http://semantic-ui.com/images/wireframe/square-image.png"></p>
					<p><img class="ui centered rounded image" src="http://semantic-ui.com/images/wireframe/square-image.png"></p>
				</div>
			</div>
		</div>
		<div class="ui secondary inverted black raised segment">

			<div class="ui three column grid">
				<div class="column">
					<img class="ui small centered rounded image" src="http://semantic-ui.com/images/wireframe/square-image.png">
				</div>
				<div class="column">
					<img class="ui small centered rounded image" src="http://semantic-ui.com/images/wireframe/square-image.png">
				</div>
				<div class="column">
					<img class="ui small centered rounded image" src="http://semantic-ui.com/images/wireframe/square-image.png">
				</div>
			</div>

			<div class="ui three column centered grid">
				<div class="column">
					<img class="ui small centered rounded image" src="http://semantic-ui.com/images/wireframe/square-image.png">
				</div>
				<div class="column">
					<img class="ui small centered rounded image" src="http://semantic-ui.com/images/wireframe/square-image.png">
				</div>
				<div class="column">
					<img class="ui small centered rounded image" src="http://semantic-ui.com/images/wireframe/square-image.png">
				</div>
			</div>

			<div class="ui three column centered grid">
				<div class="column">
					<img class="ui small centered rounded image" src="http://semantic-ui.com/images/wireframe/square-image.png">
				</div>
				<div class="column">
					<img class="ui small centered rounded image" src="http://semantic-ui.com/images/wireframe/square-image.png">
				</div>
				<div class="column">
					<img class="ui small centered rounded image" src="http://semantic-ui.com/images/wireframe/square-image.png">
				</div>
			</div>

		</div>

	<a class="ui button" v-on:click="onModal()">Test Modal</a>

</div>

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
				// settlementId: this.$route.params.key,
				// survivors: {}
			}
		},

		computed: {
			...mapState(['auth'])
		},

		mounted () {
			window.document.title = 'Gear Grid'

			// this.getSurvivor()
			// this.getSettlementLocation()
		},

		methods: {

			getSurvivorGearGrid () {

				firebase.database().ref('survivorGearGrid').child(this.$route.params.surid).on('value', function(snapshot) {

					this.survivors = snapshot.val()

				}.bind(this));

			},

			onModal () {

				$('.ui.long.modal').modal('show',
				{
					'.ui.long.modal' : {
						active    : 'active',
						scrolling : 'scrolling'
					},
					blurring: true
				});
			},

			addEquipment ()
			{
				// var input = this.input
				var survivor = firebase.database().ref('settlementSurvivor').child(this.$route.params.key).push(this.survivor())
				firebase.database().ref('survivorGearGrid').child(survivor.key).push(this.survivorGearGrid())
				// this.input = ''
			}
		}

	}
</script>
