<template>

	<div class="ui basic segment container">

		<form class="ui secondary inverted black form segment" v-on:submit.stop.prevent="createSettlement">

			<h3 class="ui header">
				<img src="https://firebasestorage.googleapis.com/v0/b/kd-monster-online-sheet.appspot.com/o/lantern_48x48.png?alt=media&token=fb21135c-4a90-403b-b84c-dfdf04496f0e" class="ui image">
				<div class="content">Create New Settlement</div>
			</h3>
<!-- 			<i class='mdi mdi-cards mdi-24px mdi-flip-horizontal'></i>
			<i class='lightning circular inverted tiny black icon'></i>
			<i class='puzzle circular flipped inverted tiny blue icon'></i>
			<i class='puzzle circular flipped inverted tiny red icon'></i>
 -->
			<i class='ui circular inverted tiny flipped icon'><i class='glyphicon glyphicon-knight'></i></i>
			<p v-html="test.detail"></p>
			<div class="field">
				<div class="ui action right labeled inverted icon input">
					<input type="text" placeholder="Settlement Name" v-model="input.name">
					<a id="btnSubmit" class="ui inverted icon button" type="submit"><i class="plus icon"></i></a>
				</div>
			</div>

		</form>
		<button v-on:click="onResource" class="ui inverted button"><i class="plus icon"></i> Resource</button>
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
		<h3 v-if="resource" class="ui inverted header">
			Basic Resource
		</h3>

		<table class="ui selectable striped inverted table">
			<tbody v-if="resource" v-for="(value, name) in resource" >
				<tr>
					<td>
						<img class="ui custom mini rounded centered image" v-bind:src="value.image">
						<i id="test" class="inverted heart icon" title="Hello I am a popup"></i>
					</td>
					<td>
						<div class="ui grid">
							<div class="sixteen wide center aligned mobile only column">
								<router-link :to="'resource/basic/'+(name === '???' ? 'unknown' : name)" style="color:#fff; font-weight: bold;">{{ name }}</router-link>
								<p><i v-html="value.type"></i></p>
								<p v-html="value.detail"></p>
							</div>
							<div class="sixteen wide computer only tablet only column">
								<router-link :to="'resource/basic/'+(name === '???' ? 'unknown' : name)" style="color:#fff; font-weight: bold;">{{ name }}</router-link>
								<p><i v-html="value.type"></i></p>
								<p v-html="value.detail"></p>
							</div>
						</div>
					</td>
				</tr>

			</tbody>
		</table>

<!-- หนังสือ -->
<!-- 📖 -->
<!-- ดายไขว้ -->
<!-- ⚔ -->

		<table class="ui inverted selectable fixed large unstackable table" style="cursor:pointer;">
			<thead>
				<tr>
					<th colspan="2">Settlement</th>
				</tr>
			</thead>
			<tbody>
				<tr v-if="items" v-for="(item, key) in items" >
					<td><router-link :to="'settlement/'+key" style="color:#fff; font-weight: bold;"><i class="chevron circle right icon"></i>{{ item.name }}</router-link></td>
					<td class="right aligned"><a class="ui button mini circular icon" v-on:click="deleteItem(key)"><i class="close icon"></i></a></td>
				</tr>
			</tbody>
		</table>
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
				items: [],
				test: {},
				resource: {}
			}
		},

		computed: {
			...mapState(['auth'])
		},

		mounted () {
			var name = this.input
			window.document.title = 'Create New Settlement'
			// $('#test').popup({
			// 	title   : 'Popup Title',
			// 	content : 'Hello I am a popup'
			// })
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

			this.getSettlement()
		},

		methods: {

			getSettlement() {

				firebase.database().ref('settlement').child(this.auth.key).on('value', function(snapshot) {

					this.items = snapshot.val()

				}.bind(this))

			},

			onResource() {

				firebase.database().ref('itemResource').child('Basic Resource').on('value', function(snapshot) {

					this.resource = snapshot.val()

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
			// 	firebase.database().ref('itemResource').child('Monster Resource').on('value', function(snapshot) {

			// 		this.resource = snapshot.val()
			// 		var input = {}
			// 		$.each(snapshot.val(), function (key, value) {
			// 			input[key] = {}
			// 			$.each(value, function (key2, value2) {
			// 				input[key][key2] = {type: {type : value2.type}, count:0}
			// 				// input[key][key2] = {count: 0}
			// 				// console.log(key2)
			// 			})

			// 			// insert ลง table แบบกำหนดคีย์เอง

			// 			// ระวังเรื่องการใช้ set มันจะทับข้อมูเก่า
			// 			firebase.database().ref('settlementStorage').child('-Ka6SGmaTHr8_U6dgBzq').child('Resource').child('Monster Resource').update(input)
			// 		})
			// 		console.log(input)
			// 	}.bind(this))
			// },

			createSettlement () {

				var input = this.input
				// input['owner'] = { key: this.auth.key, name: this.auth.name }
				if(input.name)
				{
					input['owner'] = this.auth.name
					$('#btnSubmit').addClass('loading')
					var row = firebase.database().ref('settlement').child(this.auth.key).push(input)
					firebase.database().ref('settlementLocation').child(row.key).set(this.locationCoreGame())
					firebase.database().ref('settlementStorage').child(row.key).child('Resource').child('Basic Resource').set(this.basciResource())
					firebase.database().ref('settlementStorage').child(row.key).child('Resource').child('Strange Resource').set(this.strangeResource())
					firebase.database().ref('settlementStorage').child(row.key).child('Resource').child('Monster Resource').child('Antelope').set(this.antelopeResource())
					firebase.database().ref('settlementStorage').child(row.key).child('Resource').child('Monster Resource').child('Lion').set(this.lionResource())
					firebase.database().ref('settlementStorage').child(row.key).child('Resource').child('Monster Resource').child('Phoenix').set(this.phoenixResource())
					this.input = ''
					$('#btnSubmit').removeClass('loading')
				}
			},

			deleteItem(key) {

				firebase.database().ref('settlement').child(this.auth.key).child(key).remove()
				firebase.database().ref('settlementLocation').child(key).remove()
				firebase.database().ref('settlementStorage').child(key).remove()

			},

			locationCoreGame() {

				return {
					'Barber Surgeon': 0,
					'Blacksmith': 0,
					'Bone Smith': 0,
					'Catarium': 0,
					'Exhausted Lantern Hoard': 0,
					'Lantern Hoard': 1,
					'Leather Worker': 0,
					'Mask Maker': 0,
					'Organ Grinder': 0,
					'Plumery': 0,
					'Skinnery': 0,
					'Stone Circle': 0,
					'Weapon Crafter': 0
				}
			},

			basciResource() {

				return {
					'???': {
						count: 0 ,
						type : {
							bone: 'bone',
							consumable: 'consumable' ,
							hide: 'hide',
							organ: 'organ'
						}
					},
					'Broken Lantern': {
						count: 0,
						type : {
							scrap: 'scrap'
						}
					},
					'Love Juice': {
						count: 0,
						type : {
							organ: 'organ',
							consumable: 'consumable'
						}
					},
					'Monster Bone': {
						count: 0,
						type : {
							bone: 'bone'
						}
					},
					'Monster Hide': {
						count: 0,
						type : {
							hide: 'hide'
						}
					},
					'Monster Organ': {
						count: 0,
						type : {
							organ: 'organ',
							consumable: 'consumable'
						}
					},
					'Skull': {
						count: 0,
						type : {
							bone: 'bone'
						}
					}
				}
			},

			strangeResource() {

				return {
					'Elder Cat Teeth': {
						count: 0 ,
						type : {
							bone: 'bone'
						}
					},
					'Fresh Acanthus': {
						count: 0,
						type : {
							herb: 'herb'
						}
					},
					'Iron': {
						count: 0,
						type : {
							scrap: 'scrap'
						}
					},
					'Leather': {
						count: 0,
						type : {
							hide: 'hide'
						}
					},
					'Legendary Horns': {
						count: 0,
						type : {
							bone: 'bone',
							scrap: 'scrap'
						}
					},
					'Perfect Crucible': {
						count: 0,
						type : {
							iron: 'iron'
						}
					},
					'Phoenix Crest': {
						count: 0,
						type : {
							organ: 'organ'
						}
					},
					'Second Heart': {
						count: 0,
						type : {
							bone: 'bone',
							organ: 'organ'
						}
					}
				}
			},

			antelopeResource() {

				return {
					'Bladder': {
						count: 0 ,
						type : {
							consumable: 'consumable',
							organ: 'organ'
						}
					},
					'Consumable': {
						count: 0,
						type : {
							consumable: 'consumable',
							organ: 'organ'
						}
					},
					'Large Flat Tooth': {
						count: 0,
						type : {
							bone: 'bone'
						}
					},
					'Muscly Gums': {
						count: 0,
						type : {
							consumable: 'consumable',
							organ: 'organ'
						}
					},
					'Pelt': {
						count: 0,
						type : {
							hide: 'hide'
						}
					},
					'Screaming Brain': {
						count: 0,
						type : {
							organ: 'organ',
							consumable: 'consumable'
						}
					},
					'Shank Bone': {
						count: 0,
						type : {
							bone: 'bone'
						}
					},
					'Spiral Horn': {
						count: 0,
						type : {
							bone: 'bone'
						}
					}
				}
			},

			lionResource() {

				return {
					'Curious Hand': {
						count: 0 ,
						type : {
							hide: 'hide'
						}
					},
					'Eye of Cat': {
						count: 0,
						type : {
							consumable: 'consumable',
							organ: 'organ'
						}
					},
					'Golden Whiskers': {
						count: 0,
						type : {
							organ: 'organ'
						}
					},
					'Great Cat Bones': {
						count: 0,
						type : {
							bone: 'bone'
						}
					},
					'Lion Claw': {
						count: 0,
						type : {
							bone: 'bone'
						}
					},
					'Lion Tail': {
						count: 0,
						type : {
							hide: 'hide'
						}
					},
					'Lion Testes': {
						count: 0,
						type : {
							organ: 'organ',
							consumable: 'consumable'
						}
					},
					'Shimmering Mane': {
						count: 0,
						type : {
							hide: 'hide'
						}
					},
					'Sinew': {
						count: 0,
						type : {
							organ: 'organ'
						}
					},
					'White Fur': {
						count: 0,
						type : {
							hide: 'hide'
						}
					}
				}
			},

			phoenixResource() {

				return {
					'Bird Beak': {
						count: 0 ,
						type: {
							bone: 'bone'
						}
					},
					'Black Skull': {
						count: 0,
						type : {
							iron: 'iron',
							skull: 'skull',
							bone: 'bone'
						}
					},
					'Hollow Wing Bones': {
						count: 0,
						type : {
							bone: 'bone'
						}
					},
					'Muculent Droppings': {
						count: 0,
						type : {
							organ: 'organ'
						}
					},
					'Phoenix Eye': {
						count: 0,
						type : {
							organ: 'organ',
							scrap: 'scrap'
						}
					},
					'Phoenix Finger': {
						count: 0,
						type : {
							bone: 'bone'
						}
					},
					'Phoenix Whisker': {
						count: 0,
						type : {
							hide: 'hide'
						}
					},
					'Pustules': {
						count: 0,
						type : {
							consumable: 'consumable',
							organ: 'organ'
						}
					},
					'Rainbow Droppings': {
						count: 0,
						type : {
							consumable: 'consumable',
							organ: 'organ'
						}
					},
					'Shimmering Halo': {
						count: 0,
						type : {
							organ: 'organ'
						}
					},
					'Small Feathers': {
						count: 0,
						type : {
							hide: 'hide'
						}
					},
					'Small Hand Parasites': {
						count: 0,
						type : {
							organ: 'organ'
						}
					},
					'Tail Feathers': {
						count: 0,
						type : {
							hide: 'hide'
						}
					},
					'Wishbone': {
						count: 0,
						type : {
							bone: 'bone'
						}
					}
				}
			},

			setData() {

			}
		}

	}
</script>