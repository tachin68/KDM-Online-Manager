<template>
	<div class="ui basic segment container">

		<div class="card">
			<div class="topAffinity "></div>
			<div class="bottomAffinity "></div>
			<div class="leftAffinity red"></div>
			<div class="rightAffinity "></div>
		</div>


<!-- หนังสือ -->
<!-- 📖 -->
<!-- ดายไขว้ -->
<!-- ⚔ -->

	</div>
</template>
<style>
	.card {
		width: 50px;
		height: 50px;
		border: 0px #EDEDED solid;
		position: relative;
		border-radius: 5px;
		background-color: #EDEDED;
	}
	.topAffinity {
		position: absolute;
		top: 0;
		left: 15px;
		width: 20px;
		height: 10px;
	}
	.bottomAffinity {
		position: absolute;
		bottom: 0;
		left: 15px;
		width: 20px;
		height: 10px;
	}
	.leftAffinity {
		position: absolute;
		left: 0;
		top: 15px;
		width: 10px;
		height: 20px;
	}
	.rightAffinity {
		position: absolute;
		right: 0;
		top: 15px;
		width: 10px;
		height: 20px;
	}
	.red {
		background-color: red;
	}
	.green {
		background-color: #32CD32;
	}
	.blue {
		background-color: #00BFFF;
	}
	.required {
		border: 1px #FF4500 solid;
		border-radius: 5px;
		background-color: #FF4500;
		width: 100%;
		padding: 5px;
	}
</style>

<script>

	import { mapState } from 'vuex'

	export default {

		data () {

			return {
				input: {
					name: ''
				},
				basic_resource: {},
				monster_resource: {},
				mon_owner_resource: {},
				strange_resource: {}
			}
		},

		computed: {
			...mapState(['auth'])
		},

		mounted () {
			window.document.title = 'Resource';
			$('.ui.accordion').accordion();

			// $('.ui.dropdown').dropdown()
			// $('#img .inline.icon').popup({ inline: true })

			// $('tr.center.aligned > td > .ui.custom.small').popup({ inline: true })
			// $('.inline.icon').popup({ inline: true })

			// $('.ui.image').popup({ inline: true })
			// $('.ui.image').popup({
			// 	popup : $('.custom.popup'),
			// 	hoverable  : true
			// 	// on    : 'click'
			// })
			//
			// $('.ui.custom.small').popup({
			// 	popup : $('.custom.popup'),
			// 	on    : 'click'
			// })

			// this.getBasicResource()
		},

		methods: {

			getBasicResource() {

				firebase.database().ref('itemResource').child('Basic Resource').on('value', function(snapshot) {

					this.basic_resource = snapshot.val()

				}.bind(this))
			},

			getMonsterResource() {

				firebase.database().ref('itemResource').child('Monster Resource').on('value', function(snapshot) {

					this.monster_resource = snapshot.val()

				}.bind(this))
			},

			getMonResourceByName(name) {

				firebase.database().ref('itemResource').child('Monster Resource').child(name).on('value', function(snapshot) {

					this.mon_owner_resource = snapshot.val()

				}.bind(this))
			},

			getStrangeResource() {

				firebase.database().ref('itemResource').child('Strange Resource').on('value', function(snapshot) {

					this.strange_resource = snapshot.val()

				}.bind(this))
			},
		}

	}
</script>