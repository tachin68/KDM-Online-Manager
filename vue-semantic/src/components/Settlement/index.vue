<template>
	<div class="ui basic segment container">
		<!-- <breadcrumb></breadcrumb> -->

		<!-- <pre> -->
<!-- {{ settlement }} -->
<!-- {{ breadcrumb }} -->
<!-- {{ auth.key }} -->
<!-- {{ share }} -->
		<!-- </pre> -->

		<md-card md-with-hover>
			<!-- <md-card-area md-inset> -->
				<md-whiteframe md-tag="md-toolbar" class="md-toolbar-container" md-elevation="5">
					<div class="md-title">
						<div class="md-toolbar-container">
							<h2 class="md-headline" style="flex: 1;">Create Settlement</h2>
						</div>
					</div>
				</md-whiteframe>

				<md-card-header>
					<md-card-header-text>
						<form novalidate v-on:submit.stop.prevent="createSettlement">
							<md-input-container class="md-accent md-theme-default">
								<md-icon>add_circle</md-icon>
								<label>Settlement Name</label>
								<md-input type="text" v-model="input.name"></md-input>
							</md-input-container>
							<md-snackbar :md-position="'bottom center'" ref="snackbar" :md-duration="5000">
								<span>Create Settlement Success.</span>
								<md-button class="md-accent" @click.native="$refs.snackbar.close()">OK</md-button>
							</md-snackbar>
						</form>
					</md-card-header-text>
				</md-card-header>
			<!-- </md-card-area> -->
		</md-card>

		<md-card md-with-hover style="margin-top:1rem;">
			<md-whiteframe md-tag="md-toolbar" class="md-toolbar-container" md-elevation="5">
				<div class="md-title">
					<div class="md-toolbar-container">
						<h2 class="md-headline" style="flex: 1;"> Settlements</h2>
					</div>
				</div>
			</md-whiteframe>

			<md-card-content>
				<md-layout md-column md-gutter v-for="(item, key) in items">
					<md-list>
						<li class="md-list-item">
							<md-layout md-gutter>
								<md-layout>
									<router-link :to="'settlement/'+key" class="md-button md-list-item-container">
										<i class="md-icon material-icons md-theme-default">forward</i><span>{{ item.name }}</span>
									</router-link>

									<md-button md-theme="about" class="md-icon-button md-list-action" @click="openDialog(key)">
										<i class="md-icon material-icons md-theme-default">delete_forever</i>
									</md-button>

									<md-dialog :ref="key">
										<md-dialog-title>Are you sure you want to delete this settlement ?</md-dialog-title>
										<md-dialog-actions>
											<md-button class="md-accent" @click="closeDialog(key)">Cancel</md-button>
											<md-button class="md-accent" @click="deleteItem(key)">Ok</md-button>
										</md-dialog-actions>
									</md-dialog>
								</md-layout>
							</md-layout>
						</li>
					</md-list>
					<md-divider class="md-inset"></md-divider>
				</md-layout>
			</md-card-content>

		</md-card>

		<md-card md-with-hover style="margin-top:1rem;">
			<md-whiteframe md-tag="md-toolbar" class="md-toolbar-container" md-elevation="5">
				<div class="md-title">
					<div class="md-toolbar-container">
						<h2 class="md-headline" style="flex: 1;"> Settlements Share</h2>
					</div>
				</div>
			</md-whiteframe>

			<md-card-content>
				<md-layout md-align="center" md-column md-gutter v-for="(item, key) in share">
					<md-list>
						<li class="md-list-item">
							<div class="md-list-item-holder">
								<md-layout md-gutter>
									<md-layout>
										<router-link :to="'settlement/'+key" class="md-button md-list-item-container">
											<i class="md-icon material-icons md-theme-default">forward</i><span>{{ item.name }}</span>
										</router-link>

										<md-button md-theme="about" class="md-icon-button md-list-action" @click="openDialog(key)">
											<i class="md-icon material-icons md-theme-default">delete_forever</i>
										</md-button>

										<md-dialog :ref="key">
											<md-dialog-title>Are you sure you want to delete this share settlement ?</md-dialog-title>
											<md-dialog-actions>
												<md-button class="md-accent" @click="closeDialog(key)">Cancel</md-button>
												<md-button class="md-accent" @click="deleteShareSettlement(key)">Ok</md-button>
											</md-dialog-actions>
										</md-dialog>
									</md-layout>
								</md-layout>
							</div>
						</li>
					</md-list>
					<!-- <md-divider class="md-inset"></md-divider> -->
				</md-layout>
			</md-card-content>

		</md-card>

	</div>
</template>

<script>

	import { mapState } from 'vuex'

	export default {

		data () {

			return {
				input: {

					name: '',
					survival_limit: { name: 'Survival Limit', value: 1 },
					depart: { name: 'Depart', value:0 },
					population: { name:'Population', value: 0},
					dead: { name:'Dead', value: 0}
				},
				items: [],
				owner: null,
				share: {},
				resource: {}
			}
		},

		computed: {
			...mapState(['auth', 'settlement'])
		},

		mounted () {
			this.$store.dispatch('setSettlementIndex')
			window.document.title = 'Settlements'
			this.getSettlementShare()
			this.getSettlement()
		},

		methods: {

			openDialog(ref) {
				this.$refs[ref][0].open()
			},

			closeDialog(ref) {
				this.$refs[ref][0].close()
			},

			getSettlementShare() {

				firebase.database().ref('user_has_settlement').child(this.auth.key).on('value', function(snapshot) {
				// firebase.database().ref('user_has_settlement').child('-KrBbRhXmHHi96Vg4WBg').on('value', function(snapshot) {

					this.share = snapshot.val()

				}.bind(this))

			},

			getSettlement() {

				firebase.database().ref('settlement').child(this.auth.key).on('value', function(snapshot) {

					this.owner = snapshot.key
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
			//  // เลือก table ที่ต้องการ
			//  firebase.database().ref('itemsResource').on('value', function(snapshot) {

			//    this.resource = snapshot.val()
			//    var input = {}
			//    $.each(snapshot.val(), function (key, value) {
			//      input[key] = value

			//      // insert ลง table แบบกำหนดคีย์เอง
			//      firebase.database().ref('itemResource').set(input)
			//    })
			//        // console.log(input)
			//  }.bind(this))
			// },

			// // ดึงข้อมูลจาก Table นึงไปใส่ table อื่นๆ
			// onResource() {
			//  // เลือก table ที่ต้องการ
			//  firebase.database().ref('itemResource').child('Monster Resource').on('value', function(snapshot) {

			//    this.resource = snapshot.val()
			//    var input = {}
			//    $.each(snapshot.val(), function (key, value) {
			//      input[key] = {}
			//      $.each(value, function (key2, value2) {
			//        input[key][key2] = {type: {type : value2.type}, count:0}
			//        // input[key][key2] = {count: 0}
			//        // console.log(key2)
			//      })

			//      // insert ลง table แบบกำหนดคีย์เอง

			//      // ระวังเรื่องการใช้ set มันจะทับข้อมูเก่า
			//      firebase.database().ref('settlementStorage').child('-Ka6SGmaTHr8_U6dgBzq').child('Resource').child('Monster Resource').update(input)
			//    })
			//    console.log(input)
			//  }.bind(this))
			// },

			createSettlement () {

				var input = this.input
				// input['owner'] = { key: this.auth.key, name: this.auth.name }
				if(input.name)
				{
					input['owner'] = this.auth.key
					// var row = firebase.database().ref('settlement').push(input)
					var row = firebase.database().ref('settlement').child(this.auth.key).push(input)

					firebase.database().ref('settlementStorageGear').child(row.key).push({empty:''})
					firebase.database().ref('settlementLocation').child(row.key).set(this.locationCoreGame())
					firebase.database().ref('settlementStorage').child(row.key).child('Resource').child('Basic Resource').set(this.basciResource())
					firebase.database().ref('settlementStorage').child(row.key).child('Resource').child('Strange Resource').set(this.strangeResource())
					firebase.database().ref('settlementStorage').child(row.key).child('Resource').child('Monster Resource').child('Antelope').set(this.antelopeResource())
					firebase.database().ref('settlementStorage').child(row.key).child('Resource').child('Monster Resource').child('White Lion').set(this.lionResource())
					firebase.database().ref('settlementStorage').child(row.key).child('Resource').child('Monster Resource').child('Phoenix').set(this.phoenixResource())
					firebase.database().ref('settlementStorage').child(row.key).child('Resource').child('Vermin Resource').set(this.verminResource())
					firebase.database().ref('settlement_has_survivor').child(row.key).set(this.settlementHasSurvivor())

					this.input.name = ''
					this.$refs.snackbar.open()
				}
			},

			deleteShareSettlement(key) {
				firebase.database().ref('user_has_settlement').child(this.auth.key).child(key).remove()
				this.closeDialog(key)
			},

			deleteItem(key) {
				var uhs			= {}
				var member		= {}
				var survivors	= {}

				firebase.database().ref('settlementSurvivor').child(key).on('value', function(snapshot) {

					survivors = snapshot.val()

				}.bind(this))

				if(survivors)
				{
					$.each(survivors, function(surKey, value) {
						firebase.database().ref('survivorCourage').child(surKey).remove()
						firebase.database().ref('survivorDisorders').child(surKey).remove()
						firebase.database().ref('survivorFightingArts').child(surKey).remove()
						firebase.database().ref('survivorUnderstanding').child(surKey).remove()
						firebase.database().ref('survivorGearGrid').child(surKey).remove()
					})
				}

				firebase.database().ref('settlementMember').child(key).on('value', function(snapshot) {

					member = snapshot.val()

				}.bind(this))

				$.each(member, function(k, memKey) {

					var arr = {}
					var i = 0

					firebase.database().ref('user_has_settlement').child(memKey).on('value', function(snapshot) {
						if(snapshot.val()) uhs = snapshot.val()
					}.bind(this))

					if(uhs)
					{
						$.each(uhs, function(k2, settleKey) {
							if(settleKey != key) arr[i++] = settleKey
						})
					}

					firebase.database().ref('user_has_settlement').child(memKey).set(arr)
				})

				firebase.database().ref('settlement').child(this.auth.key).child(key).remove()
				firebase.database().ref('settlementLocation').child(key).remove()
				firebase.database().ref('settlementStorage').child(key).remove()
				firebase.database().ref('settlementStorageGear').child(key).remove()
				firebase.database().ref('settlementSurvivor').child(key).remove()
				firebase.database().ref('settlementMember').child(key).remove()
				firebase.database().ref('settlementLocation').child(key).remove()

				this.closeDialog(key)
			},

			settlementHasSurvivor() {
				return	{
							survival_limit: { name: 'Survival Limit', value: 1 },
							depart: { name: 'Depart', value:0 },
							population: { name:'Population', value: 0},
							dead: { name:'Dead', value: 0}
						}
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
						count: 0,
						type : {
							consumable: 'consumable',
							organ: 'organ'
						}
					},
					'Beast Steak': {
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

			verminResource() {

				return {
					'Crab Spider': {
						count: 0 ,
						type: {
							hide: 'hide',
							vermin: 'vermin',
							consumable: 'consumable'
						}
					},
					'Cyclops Fly': {
						count: 0,
						type : {
							vermin: 'vermin',
							consumable: 'consumable'
						}
					},
					'Hissing Cockroach': {
						count: 0,
						type : {
							vermin: 'vermin',
							consumable: 'consumable'
						}
					},
					'Lonely Ant': {
						count: 0,
						type : {
							vermin: 'vermin',
							consumable: 'consumable'
						}
					},
					'Nightmare Tick': {
						count: 0,
						type : {
							vermin: 'vermin',
							consumable: 'consumable'
						}
					},
					'Sword Beetle': {
						count: 0,
						type : {
							vermin: 'vermin',
							consumable: 'consumable'
						}
					}
				}
			}
		},

		components: {},
	}
</script>