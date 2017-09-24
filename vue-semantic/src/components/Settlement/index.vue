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
					s_limit: { name: 'Survival Limit', value: 1 },
					depart: { name: 'Depart', value:0 },
					population: { name:'Population', value: 0 },
					dead: { name:'Dead', value: 0 }
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

				if(input.name)
				{
					input['owner'] = this.auth.key

					var row = firebase.database().ref('settlement').child(this.auth.key).push(input)

					// Gear Storage
					firebase.database().ref('settlementStorageGear').child(row.key).child('Barber Surgeon').set(this.storageGearBarberSurgeon())
					firebase.database().ref('settlementStorageGear').child(row.key).child('Blacksmith').set(this.storageGearBlacksmith())
					firebase.database().ref('settlementStorageGear').child(row.key).child('Bone Smith').set(this.storageGearBoneSmith())
					firebase.database().ref('settlementStorageGear').child(row.key).child('Catarium').set(this.storageGearCatarium())
					firebase.database().ref('settlementStorageGear').child(row.key).child('Leather Worker').set(this.storageGearLeatherWorker())
					firebase.database().ref('settlementStorageGear').child(row.key).child('Mask Maker').set(this.storageGearMaskMaker())
					firebase.database().ref('settlementStorageGear').child(row.key).child('Organ Grinder').set(this.storageGearOrganGrinder())
					firebase.database().ref('settlementStorageGear').child(row.key).child('Plummery').set(this.storageGearPlummery())
					firebase.database().ref('settlementStorageGear').child(row.key).child('Rare Gear').set(this.storageGearRareGear())
					firebase.database().ref('settlementStorageGear').child(row.key).child('Skinnery').set(this.storageGearSkinnery())
					firebase.database().ref('settlementStorageGear').child(row.key).child('Starting Gear').set(this.storageGearStartingGear())
					firebase.database().ref('settlementStorageGear').child(row.key).child('Stone Circle').set(this.storageGearStoneCircle())
					firebase.database().ref('settlementStorageGear').child(row.key).child('Weapon Crafter').set(this.storageGearWeaponCrafter())

					// Resource Storage
					firebase.database().ref('settlementStorage').child(row.key).child('Resource').child('Basic Resource').set(this.basciResource())
					firebase.database().ref('settlementStorage').child(row.key).child('Resource').child('Strange Resource').set(this.strangeResource())
					firebase.database().ref('settlementStorage').child(row.key).child('Resource').child('Monster Resource').child('Antelope').set(this.antelopeResource())
					firebase.database().ref('settlementStorage').child(row.key).child('Resource').child('Monster Resource').child('White Lion').set(this.lionResource())
					firebase.database().ref('settlementStorage').child(row.key).child('Resource').child('Monster Resource').child('Phoenix').set(this.phoenixResource())
					firebase.database().ref('settlementStorage').child(row.key).child('Resource').child('Vermin Resource').set(this.verminResource())

					// innovation
					firebase.database().ref('settlementInnovation').child(row.key).set(this.innovation())

					firebase.database().ref('settlementLocation').child(row.key).set(this.locationCoreGame())
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
				firebase.database().ref('settlementLocation').child(key).remove()
				firebase.database().ref('settlementInnovation').child(key).remove()

				this.closeDialog(key)
			},

			settlementHasSurvivor() {
				return	{
					s_limit: { name: 'Survival Limit', value: 1 },
					depart: { name: 'Depart', value:0 },
					population: { name:'Population', value: 0},
					dead: { name:'Dead', value: 0},
					dodge: true,
					encorage: true,
					dash: true,
					surge: true
				}
			},

			locationCoreGame() {

				return {
					'Barber Surgeon': {
						status: 0
					},
					'Blacksmith': {
						status: 0
					},
					'Bone Smith': {
						status: 0
					},
					'Catarium': {
						status: 0
					},
					'Exhausted Lantern Hoard': {
						status: 0
					},
					'Lantern Hoard': {
						status: 1
					},
					'Leather Worker': {
						status: 0
					},
					'Mask Maker': {
						status: 0
					},
					'Organ Grinder': {
						status: 0
					},
					'Plumery': {
						status: 0
					},
					'Skinnery': {
						status: 0
					},
					'Stone Circle': {
						status: 0
					},
					'Weapon Crafter': {
						status: 0
					}
				}
			},

			// start Resource Settlement
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
			},


			// start Gear Settlement
			storageGearBarberSurgeon() {
				return {
					'Almanac': {
						count: 0 ,
						type: {
							item: 'item',
							soluble: 'soluble',
							flammable: 'flammable'
						}
					},
					'Brain Mint': {
						count: 0 ,
						type: {
							item: 'item',
							consumable: 'consumable'
						}
					},
					'Bug Trap': {
						count: 0 ,
						type: {
							item: 'item',
							soluble: 'soluble'
						}
					},
					'Elder Earings': {
						count: 0 ,
						type: {
							item: 'item',
							jewelry: 'jewelry'
						}
					},
					'First Aid Kit': {
						count: 0 ,
						type: {
							item: 'item',
							heavy: 'heavy'
						}
					},
					'Musk Bomb': {
						count: 0 ,
						type: {
							item: 'item',
							thrown: 'thrown',
							fragile: 'fragile',
							stinky: 'stinky'
						}
					},
					'Scavenger Kit': {
						count: 0 ,
						type: {
							item: 'item',
							heavy: 'heavy'
						}
					},
					'Speed Powder': {
						count: 0 ,
						type: {
							item: 'item',
							soluble: 'soluble'
						}
					}
				}
			},

			storageGearBlacksmith() {
				return {
					'Beacon Shield': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							shield: 'shield',
							metal: 'metal',
							heavy: 'heavy'
						}
					},
					'Dragon Slayer': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							'grand weapon': 'grand weapon',
							'two-handed': 'two-handed',
							metal: 'metal',
							heavy: 'heavy'
						}
					},
					'Lantern Cuirass': {
						count: 0 ,
						type: {
							armor: 'armor',
							set: 'set',
							metal: 'metal',
							heavy: 'heavy'
						}
					},
					'Lantern Dagger': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							dagger: 'dagger',
							finesse: 'finesse',
							metal: 'metal'
						}
					},
					'Lantern Gauntlets': {
						count: 0 ,
						type: {
							armor: 'armor',
							set: 'set',
							dagger: 'dagger',
							metal: 'metal',
							heavy: 'heavy'
						}
					},
					'Lantern Glaive': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							spear: 'spear',
							axe: 'axe',
							'two-handed': 'two-handed',
							finesse: 'finesse',
							metal: 'metal'
						}
					},
					'Lantern Greaves': {
						count: 0 ,
						type: {
							armor: 'armor',
							set: 'set',
							metal: 'metal',
							heavy: 'heavy'
						}
					},
					'Lantern Helm': {
						count: 0 ,
						type: {
							armor: 'armor',
							set: 'set',
							metal: 'metal',
							heavy: 'heavy'
						}
					},
					'Lantern Mail': {
						count: 0 ,
						type: {
							armor: 'armor',
							set: 'set',
							metal: 'metal',
							heavy: 'heavy'
						}
					},
					'Lantern Sword': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							sword: 'sword',
							finesse: 'finesse',
							metal: 'metal'
						}
					},
					'Perfect Slayer': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							'grand weapon': 'grand weapon',
							'two-handed': 'two-handed',
							sword: 'sword',
							heavy: 'heavy',
							finesse: 'finesse',
							metal: 'metal'
						}
					},
					'Ring Whip': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							whip: 'whip',
							finesse: 'finesse',
							metal: 'metal'
						}
					},
					'Scrap Shield': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							shield: 'shield',
							bone: 'bone',
							metal: 'metal'
						}
					}
				}
			},

			storageGearBoneSmith() {
				return {
					'Bone Axe': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							axe: 'axe',
							bone: 'bone'
						}
					},
					'Bone Blade': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							sword: 'sword',
							bone: 'bone'
						}
					},
					'Bone Dagger': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							dagger: 'dagger',
							bone: 'bone'
						}
					},
					'Bone Dart': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							ranged: 'ranged',
							thrown: 'thrown',
							bone: 'bone'
						}
					},
					'Bone Pickaxe': {
						count: 0 ,
						type: {
							item: 'item',
							tool: 'tool',
							bone: 'bone'
						}
					},
					'Bone Sickle': {
						count: 0 ,
						type: {
							item: 'item',
							tool: 'tool',
							bone: 'bone'
						}
					},
					'Skull Helm': {
						count: 0 ,
						type: {
							armor: 'armor',
							bone: 'bone',
							fragile: 'fragile'
						}
					}
				}
			},

			storageGearCatarium() {
				return {
					'Cat Eye Circlet': {
						count: 0 ,
						type: {
							item: 'item',
							jewelry: 'jewelry',
							other: 'other'
						}
					},
					'Cat Fang Knife': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							dagger: 'dagger',
							bone: 'bone'
						}
					},
					'Cat Gut Bow': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							ranged: 'ranged',
							bow: 'bow',
							'two-handed': 'two-handed'
						}
					},
					'Claw Head Arrow': {
						count: 0 ,
						type: {
							item: 'item',
							ammunition: 'ammunition',
							arrow: 'arrow'
						}
					},
					'Frenzy Drink': {
						count: 0 ,
						type: {
							item: 'item',
							consumable: 'consumable',
							fragile: 'fragile'
						}
					},
					'King Spear': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							spear: 'spear',
							heavy: 'heavy',
							'two-handed': 'two-handed'
						}
					},
					'Lion Beast Katar': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							katar: 'katar'
						}
					},
					'Lion Headdress': {
						count: 0 ,
						type: {
							item: 'item',
							flammable: 'flammable'
						}
					},
					'Lion Headdress': {
						count: 0 ,
						type: {
							item: 'item',
							flammable: 'flammable'
						}
					},
					'Lion Skin Coat': {
						count: 0 ,
						type: {
							armor: 'armor',
							fur: 'fur',
							bone: 'bone',
							heavy: 'heavy',
							flammable: 'flammable'
						}
					},
					'Whisker Harp': {
						count: 0 ,
						type: {
							item: 'item',
							instrument: 'instrument',
							noisy: 'noisy'
						}
					},
					'White Lion Boots': {
						count: 0 ,
						type: {
							armor: 'armor',
							set: 'set',
							fur: 'fur',
							heavy: 'heavy'
						}
					},
					'White Lion Coat': {
						count: 0 ,
						type: {
							armor: 'armor',
							set: 'set',
							fur: 'fur',
							heavy: 'heavy'
						}
					},
					'White Lion Gauntlet': {
						count: 0 ,
						type: {
							armor: 'armor',
							set: 'set',
							fur: 'fur',
							heavy: 'heavy'
						}
					},
					'White Lion Helm': {
						count: 0 ,
						type: {
							armor: 'armor',
							set: 'set',
							fur: 'fur',
							heavy: 'heavy'
						}
					},
					'White Lion Skirt': {
						count: 0 ,
						type: {
							armor: 'armor',
							set: 'set',
							fur: 'fur',
							heavy: 'heavy'
						}
					}
				}
			},

			storageGearLeatherWorker() {
				return {
					'Hunter Whip': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							whip: 'whip',
							leather: 'leather'
						}
					},
					'Leather Boots': {
						count: 0 ,
						type: {
							armor: 'armor',
							set: 'set',
							leather: 'leather'
						}
					},
					'Leather Bracers': {
						count: 0 ,
						type: {
							armor: 'armor',
							set: 'set',
							leather: 'leather'
						}
					},
					'Leather Cuirass': {
						count: 0 ,
						type: {
							armor: 'armor',
							set: 'set',
							leather: 'leather'
						}
					},
					'Leather Mask': {
						count: 0 ,
						type: {
							armor: 'armor',
							set: 'set',
							leather: 'leather'
						}
					},
					'Leather Skirt': {
						count: 0 ,
						type: {
							armor: 'armor',
							set: 'set',
							leather: 'leather'
						}
					},
					'Round Leather Shield': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							shield: 'shield',
							leather: 'leather'
						}
					}
				}
			},

			storageGearMaskMaker() {
				return {
					'Antelope Mask': {
						count: 0 ,
						type: {
							item: 'item',
							mask: 'mask',
							bone: 'bone',
							other: 'other'
						}
					},
					'Death Mask': {
						count: 0 ,
						type: {
							item: 'item',
							mask: 'mask',
							bone: 'bone',
							other: 'other'
						}
					},
					'God Mask': {
						count: 0 ,
						type: {
							item: 'item',
							mask: 'mask',
							bone: 'bone',
							other: 'other'
						}
					},
					'Man Mask': {
						count: 0 ,
						type: {
							item: 'item',
							mask: 'mask',
							bone: 'bone',
							other: 'other'
						}
					},
					'Phoenix Mask': {
						count: 0 ,
						type: {
							item: 'item',
							mask: 'mask',
							bone: 'bone',
							other: 'other'
						}
					},
					'White Lion Mask': {
						count: 0 ,
						type: {
							item: 'item',
							mask: 'mask',
							bone: 'bone',
							other: 'other'
						}
					}
				}
			},

			storageGearOrganGrinder() {
				return {
					'Dried Acanthus': {
						count: 0 ,
						type: {
							item: 'item',
							herb: 'herb',
							consumable: 'consumable'
						}
					},
					'Fecal Salve': {
						count: 0 ,
						type: {
							item: 'item',
							balm: 'balm',
							stinky: 'stinky'
						}
					},
					'Lucky Charm': {
						count: 0 ,
						type: {
							item: 'item',
							jewelry: 'jewelry'
						}
					},
					'Monster Grease': {
						count: 0 ,
						type: {
							item: 'item',
							consumable: 'consumable',
							soluble: 'soluble',
							stinky: 'stinky'
						}
					},
					'Monster Tooth Necklace': {
						count: 0 ,
						type: {
							item: 'item',
							jewelry: 'jewelry',
							bone: 'bone'
						}
					}
				}
			},

			storageGearPlummery() {
				return {
					'Arc Bow': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							ranged: 'ranged',
							bow: 'bow',
							'two-handed': 'two-handed'
						}
					},
					'Bird Bread': {
						count: 0 ,
						type: {
							item: 'item',
							consumable: 'consumable',
							soluble: 'soluble'
						}
					},
					'Bloom Sphere': {
						count: 0 ,
						type: {
							item: 'item',
							stinky: 'stinky',
							other: 'other'
						}
					},
					'Crest Crown': {
						count: 0 ,
						type: {
							item: 'item',
							other: 'other'
						}
					},
					'Feather Mantle': {
						count: 0 ,
						type: {
							item: 'item',
							flammable: 'flammable'
						}
					},
					'Feather Shield': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							shield: 'shield',
							flammable: 'flammable'
						}
					},
					'Hollow Point Arrow': {
						count: 0 ,
						type: {
							item: 'item',
							ammunition: 'ammunition',
							arrow: 'arrow'
						}
					},
					'Hollow Sword': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							sword: 'sword',
							bone: 'bone'
						}
					},
					'Hours Ring': {
						count: 0 ,
						type: {
							item: 'item',
							other: 'other'
						}
					},
					'Phoenix Faulds': {
						count: 0 ,
						type: {
							armor: 'armor',
							set: 'set',
							feather: 'feather',
							metal: 'metal',
							flammable: 'flammable'
						}
					},
					'Phoenix Gauntlet': {
						count: 0 ,
						type: {
							armor: 'armor',
							set: 'set',
							feather: 'feather',
							metal: 'metal',
							flammable: 'flammable'
						}
					},
					'Phoenix Greaves': {
						count: 0 ,
						type: {
							armor: 'armor',
							set: 'set',
							feather: 'feather',
							metal: 'metal',
							flammable: 'flammable'
						}
					},
					'Phoenix Helm': {
						count: 0 ,
						type: {
							armor: 'armor',
							set: 'set',
							feather: 'feather',
							metal: 'metal',
							flammable: 'flammable'
						}
					},
					'Phoenix Plackart': {
						count: 0 ,
						type: {
							armor: 'armor',
							set: 'set',
							feather: 'feather',
							metal: 'metal',
							flammable: 'flammable'
						}
					},
					'Sonic Tomahawk': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							axe: 'axe',
							metal: 'metal'
						}
					}
				}
			},

			storageGearRareGear() {
				return {
					'Adventure Sword': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							sword: 'sword',
							finesse: 'finesse',
							other: 'other'
						}
					},
					'Butcher Cleaver L': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							axe: 'axe',
							other: 'other'
						}
					},
					'Butcher Cleaver R': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							axe: 'axe',
							other: 'other'
						}
					},
					'Forsaker Mask': {
						count: 0 ,
						type: {
							item: 'item',
							mask: 'mask',
							metal: 'metal',
							other: 'other'
						}
					},
					'Lantern Halberd': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							'two-handed': 'two-handed',
							spear: 'spear',
							other: 'other'
						}
					},
					'Muramasa': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							katana: 'katana',
							'two-handed': 'two-handed',
							finesse: 'finesse',
							other: 'other'
						}
					},
					'Regal Faulds': {
						count: 0 ,
						type: {
							armor: 'armor',
							bone: 'bone',
							metal: 'metal'
						}
					},
					'Regal Gauntlet': {
						count: 0 ,
						type: {
							armor: 'armor',
							bone: 'bone',
							metal: 'metal'
						}
					},
					'Regal Greaves': {
						count: 0 ,
						type: {
							armor: 'armor',
							bone: 'bone',
							metal: 'metal'
						}
					},
					'Regal Helm': {
						count: 0 ,
						type: {
							armor: 'armor',
							bone: 'bone',
							metal: 'metal'
						}
					},
					'Regal Plackart': {
						count: 0 ,
						type: {
							armor: 'armor',
							bone: 'bone',
							metal: 'metal'
						}
					},
					'Steel Shield': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							shield: 'shield',
							metal: 'metal',
							heavy: 'heavy'
						}
					},
					'Steel Sword': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							sword: 'sword',
							finesse: 'finesse',
							metal: 'metal'
						}
					},
					'Thunder Maul': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							club: 'club',
							'two-handed': 'two-handed',
							other: 'other'
						}
					},
					'Twilight Sword': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							'two-handed': 'two-handed',
							finesse: 'finesse',
							other: 'other'
						}
					}
				}
			},

			storageGearSkinnery() {
				return {
					'Bandages': {
						count: 0 ,
						type: {
							item: 'item'
						}
					},
					'Rawhide Boots': {
						count: 0 ,
						type: {
							armor: 'armor',
							set: 'set',
							rawhide: 'rawhide'
						}
					},
					'Rawhide Drum': {
						count: 0 ,
						type: {
							item: 'item',
							rawhide: 'rawhide',
							instrument: 'instrument',
							noisy: 'noisy'
						}
					},
					'Rawhide Gloves': {
						count: 0 ,
						type: {
							armor: 'armor',
							set: 'set',
							rawhide: 'rawhide'
						}
					},
					'Rawhide Headband': {
						count: 0 ,
						type: {
							armor: 'armor',
							set: 'set',
							rawhide: 'rawhide'
						}
					},
					'Rawhide Pants': {
						count: 0 ,
						type: {
							armor: 'armor',
							set: 'set',
							rawhide: 'rawhide'
						}
					},
					'Rawhide Vest': {
						count: 0 ,
						type: {
							armor: 'armor',
							set: 'set',
							rawhide: 'rawhide'
						}
					},
					'Rawhide Whip': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							whip: 'whip',
							rawhide: 'rawhide'
						}
					}
				}
			},

			storageGearStartingGear() {
				return {
					'Cloth': {
						count: 0 ,
						type: {
							armor: 'armor'
						}
					},
					'Founding Stone': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							stone: 'stone'
						}
					}
				}
			},

			storageGearStoneCircle() {
				return {
					'Beast Knuckle': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							Katar: 'Katar',
							bone: 'bone'
						}
					},
					'Blood Paint': {
						count: 0 ,
						type: {
							item: 'item',
							soluble: 'soluble'
						}
					},
					'Blue Charm': {
						count: 0 ,
						type: {
							item: 'item',
							jewelry: 'jewelry',
							fragile: 'fragile'
						}
					},
					'Bone Earing': {
						count: 0 ,
						type: {
							item: 'item',
							jewelry: 'jewelry',
							bone: 'bone'
						}
					},
					'Boss Mehndi': {
						count: 0 ,
						type: {
							item: 'item',
							soluble: 'soluble'
						}
					},
					'Green Charm': {
						count: 0 ,
						type: {
							item: 'item',
							jewelry: 'jewelry',
							fragile: 'fragile'
						}
					},
					'Lance of Longinus': {
						count: 0 ,
						type: {
							melee: 'melee',
							weapon: 'weapon',
							spear: 'spear',
							'two-handed': 'two-handed',
							bone: 'bone'
						}
					},
					'Red Charm': {
						count: 0 ,
						type: {
							item: 'item',
							jewelry: 'jewelry',
							fragile: 'fragile'
						}
					},
					'Screaming Boots': {
						count: 0 ,
						type: {
							armor: 'armor',
							set: 'set',
							fur: 'fur'
						}
					},
					'Screaming Coat': {
						count: 0 ,
						type: {
							armor: 'armor',
							set: 'set',
							fur: 'fur'
						}
					},
					'Screaming Horns': {
						count: 0 ,
						type: {
							armor: 'armor',
							set: 'set',
							bone: 'bone'
						}
					},
					'Screaming Leg Warmers': {
						count: 0 ,
						type: {
							armor: 'armor',
							set: 'set',
							fur: 'fur'
						}
					},
					'Screaming Skirt': {
						count: 0 ,
						type: {
							armor: 'armor',
							set: 'set',
							fur: 'fur'
						}
					}
				}
			},

			storageGearWeaponCrafter() {
				return {
					'Blood Sheath': {
						count: 0 ,
						type: {
							item: 'item',
							bone: 'bone',
							other: 'other'
						}
					},
					'Counterweighted Axe': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							axe: 'axe',
							'two-handed': 'two-handed'
						}
					},
					'Finger of God': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							spear: 'spear',
							'two-handed': 'two-handed'
						}
					},
					'Rainbow Katana': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							katana: 'katana',
							finesse: 'finesse',
							'two-handed': 'two-handed'
						}
					},
					'Scrap Dagger': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							dagger: 'dagger',
							metal: 'metal'
						}
					},
					'Scrap Sword': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							sword: 'sword',
							metal: 'metal'
						}
					},
					'Skullcap Hammer': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							club: 'club',
							bone: 'bone'
						}
					},
					'Whistling Mace': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							club: 'club',
							bone: 'bone'
						}
					},
					'Zanbato': {
						count: 0 ,
						type: {
							weapon: 'weapon',
							melee: 'melee',
							'grand weapon': 'grand weapon',
							'two-handed': 'two-handed',
							bone: 'bone'
						}
					}
				}
			},

			innovation() {
				return {
					"Language" : {
						status: 0,
						dex: 1,
						property: {
							encorage: true,
							s_limit: 1
						}
					},

					"Paint": {
						status: 0,
						dex: 0,
						property: {
							dash: true
						}
					},

					"Symposium": {
						status: 0,
						dex: 0,
						property: {
							s_limit: 1
						},
					},

					"Inner Lantern": {
						status: 0,
						dex: 0,
						property: {
							surge: true
						},
					},

					"Drums": {
						status: 0,
						dex: 0,
						property: {}
					},

					"Hovel": {
						status: 0,
						dex: 0,
						property: {
							depart: 1
						},
					},

					"Ammonia" : {
						status: 0,
						dex: 0,
						property: {
							depart: 1
						},
					},

					"Face Painting": {
						status: 0,
						dex: 0,
						property: {}
					},

					"Pictograph": {
						status: 0,
						dex: 0,
						property: {}
					},

					"Sculpture": {
						status: 0,
						dex: 0,
						property: {
							s_limit: 1
						}
					},

					"Memento Mori": {
						status: 0,
						dex: 0,
						property: {}
					},

					"Pottery": {
						status: 0,
						dex: 0,
						property: {
							s_limit: 1
						}
					},

					"Nightmare Training": {
						status: 0,
						dex: 0,
						property: {}
					},

					"Storytelling": {
						status: 0,
						dex: 0,
						property: {
							s_limit: 1
						}
					},

					"Records": {
						status: 0,
						dex: 0,
						property: {}
					},

					"Scarification": {
						status: 0,
						dex: 0,
						property: {}
					},

					"Shrine": {
						status: 0,
						dex: 0,
						property: {}
					},

					"Sacrifice": {
						status: 0,
						dex: 0,
						property: {}
					},

					"Forbidden Dance": {
						status: 0,
						dex: 0,
						property: {}
					},

					"Song of the Brave": {
						status: 0,
						dex: 0,
						property: {}
					},

					"Heart Flute": {
						status: 0,
						dex: 0,
						property: {}
					},

					"Saga": {
						status: 0,
						dex: 0,
						property: {}
					},

					"Bed": {
						status: 0,
						dex: 0,
						property: {
							s_limit: 1
						}
					},

					"Partnership": {
						status: 0,
						dex: 0,
						property: {}
					},

					"Family": {
						status: 0,
						dex: 0,
						property: {
							depart: 1
						}
					},

					"Clan of Death": {
						status: 0,
						dex: 0,
						property: {
							acc: 1,
							str: 1,
							eva: 1
						}
					},

					"Bloodletting": {
						status: 0,
						dex: 0,
						property: {}
					},

					"Lantern Oven": {
						status: 0,
						dex: 0,
						property: {
							depart: 1
						}
					},

					"Cooking": {
						status: 0,
						dex: 0,
						property: {
							s_limit: 1
						}
					},

					"Scrap Smelting": {
						status: 0,
						dex: 0,
						property: {}
					},

					"Final Fighting Art": {
						status: 0,
						dex: 0,
						property: {
							s_limit: 1
						}
					},

					"Guidepost": {
						status: 0,
						dex: 0,
						property: {
							depart: 1
						}
					},

					"Ultimate Weapon": {
						status: 0,
						dex: 0,
						property: {
							s_limit: 1
						}
					}
				}
			}

		},

		components: {},
	}
</script>
