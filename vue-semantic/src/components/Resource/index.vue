<template>
	<div class="ui basic segment container">

		<!-- <button v-on:click="onResource" class="ui inverted button"><i class="plus icon"></i> Resource</button> -->

		<!-- <pre>
			{{ resource }}
		</pre> -->
			<!-- <pre>
				{{ value.image }}
			</pre> -->
<!--
		<img src="http://legacy.semantic-ui.com/images/demo/photo.jpg" data-title="PonyDog22" data-content="Ponydog has been a member for 22 days" class="ui avatar image">
		<div class="ui custom popup top left transition hidden">
			<img class="ui rounded centered big image content" src="http://legacy.semantic-ui.com/images/demo/photo.jpg">
		</div> -->

		<div v-on:click="getBasicResource" class="ui styled padded inverted segment">
			<div class="ui inverted accordion">
				<div class="title">
					<i class="dropdown icon"></i>
					<b>Basic Resource</b>
				</div>
				<div class="content">
					<table class="ui selectable fixed inverted table">
						<tbody v-if="basic_resource" v-for="(value, name) in basic_resource" >
							<tr>
								<td>
									<h4 class="ui inverted image header">
										<img class="ui custom mini rounded centered image" v-bind:src="value.image" />
										<div class="content">
											<router-link :to="'resource/'+name" style="color:#fff; font-weight: bold;">{{ name }}</router-link>
											<div class="sub header"><i v-html="value.type"></i></div>
											<div class="sub header"><p v-html="value.detail"></p></div>
										</div>
									</h4>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>

		<div v-on:click="getMonsterResource" class="ui padded inverted segment">
			<div class="ui inverted fluid accordion">
				<div class="title">
					<i class="dropdown icon"></i>
					<b>Monster Resource</b>
				</div>
				<div v-if="monster_resource" class="content">
					<div v-for="(values, name) in monster_resource" class="accordion" style="padding-left:20px;">
						<div class="ui divider"></div>
						<div class="title">
							<i class="dropdown icon"></i>
							<b>{{ name }}</b>
						</div>
						<div class="content">
							<table class="ui selectable fixed inverted table">
								<tbody v-if="values" v-for="(value, name) in values">
									<tr>
										<td>
											<h4 class="ui inverted image header">
												<img class="ui custom mini rounded centered image" v-bind:src="value.image" />
												<div class="content">
													<router-link :to="'resource/'+name" style="color:#fff; font-weight: bold;">{{ name }}</router-link>
													<div class="sub header"><i v-html="value.type"></i></div>
													<div class="sub header">
														<p v-html="value.detail"></p>
													</div>
												</div>
											</h4>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div v-on:click="getStrangeResource" class="ui styled padded inverted segment">
			<div class="ui inverted accordion">
				<div class="title">
					<i class="dropdown icon"></i>
					<b>Strange Resource</b>
				</div>
				<div class="content">
					<table class="ui selectable fixed inverted table">
						<tbody v-if="strange_resource" v-for="(value, name) in strange_resource">
							<tr>
								<td>
									<h4 class="ui inverted image header">
										<img class="ui custom mini rounded centered image" v-bind:src="value.image" />
										<div class="content">
											<router-link :to="'resource/'+name" style="color:#fff; font-weight: bold;">{{ name }}</router-link>
											<div class="sub header"><i v-html="value.type"></i></div>
											<div class="sub header"><p v-html="value.detail"></p></div>
										</div>
									</h4>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>

		<div v-on:click="getVerminResource" class="ui styled padded inverted segment">
			<div class="ui inverted accordion">
				<div class="title">
					<i class="dropdown icon"></i>
					<b>Strange Resource</b>
				</div>
				<div class="content">
					<table class="ui selectable fixed inverted table">
						<tbody v-if="vermin_resource" v-for="(value, name) in vermin_resource">
							<tr>
								<td>
									<h4 class="ui inverted image header">
										<img class="ui custom mini rounded centered image" v-bind:src="value.image" />
										<div class="content">
											<router-link :to="'resource/'+name" style="color:#fff; font-weight: bold;">{{ name }}</router-link>
											<div class="sub header"><i v-html="value.type"></i></div>
											<div class="sub header"><p v-html="value.detail"></p></div>
										</div>
									</h4>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>


<!-- หนังสือ -->
<!-- 📖 -->
<!-- ดาบไขว้ -->
<!-- ⚔ -->

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
				basic_resource: {},
				monster_resource: {},
				mon_owner_resource: {},
				strange_resource: {},
				vermin_resource: {}
			}
		},

		computed: {
			...mapState(['auth'])
		},

		mounted () {
			window.document.title = 'Resource';
			$('.ui.accordion').accordion()

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

			// getMonResourceByName(name) {

			// 	firebase.database().ref('itemResource').child('Monster Resource').child(name).on('value', function(snapshot) {
			// 		this.mon_owner_resource = snapshot.val()

			// 	}.bind(this))
			// },

			getStrangeResource() {

				firebase.database().ref('itemResource').child('Strange Resource').on('value', function(snapshot) {

					this.strange_resource = snapshot.val()

				}.bind(this))
			},

			getVerminResource() {

				firebase.database().ref('itemResource').child('Vermin Resource').on('value', function(snapshot) {

					this.vermin_resource = snapshot.val()

				}.bind(this))
			},

			// ดึงข้อมูลจาก Table นึงไปใส่ table อื่นๆ
			// onResource() {
			// 	// เลือก table ที่ต้องการ
			// 	firebase.database().ref('itemsResource').on('value', function(snapshot) {

			// 		this.resource = snapshot.val()
			// 		var input = {}
			// 		$.each(snapshot.val(), function (key, value) {
			// 			input[key] = value

			// 			// insert ลง table แบบกำหนดคีย์เอง
			// 			firebase.database().ref('itemResource').set(input)
			// 		})
			// 				// console.log(input)
			// 	}.bind(this))
			// },

			// // ดึงข้อมูลจาก Table นึงไปใส่ table อื่นๆ
			// onResource() {
			// 	// เลือก table ที่ต้องการ
			// 	firebase.database().ref('WeaponProficiency').on('value', function(snapshot) {

			// 		this.resource = snapshot.val()
			// 		var input = {}
			// 		$.each(snapshot.val(), function (key, value) {
			// 			input[key] = value
			// 			// $.each(value, function (key2, value2) {
			// 			// 	input[key][key2] = value2
			// 			// })

			// 			// insert ลง table แบบกำหนดคีย์เอง
			// 			firebase.database().ref('weaponProficiency').set(input)
			// 		})
			// 				// console.log(input)
			// 	}.bind(this))
			// },

		}

	}
</script>
