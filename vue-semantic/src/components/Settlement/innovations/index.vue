<template>

	<div class="ui basic segment container">
		<md-snackbar :md-position="'top right'" ref="snackbar" :md-duration="3000">
			<span>Update Success.</span>
			<md-button class="md-accent" @click.native="$refs.snackbar.close()">OK</md-button>
		</md-snackbar>

		<md-card md-with-hover style="cursor:default;">
			<md-card-area md-inset>
				<md-whiteframe md-tag="md-toolbar" class="md-toolbar-container">
					<div class="md-title">
						<div class="md-toolbar-container">
							<h2 class="md-headline" style="flex: 1;">Dex</h2>
						</div>
					</div>
				</md-whiteframe>

				<md-card-content>
					<md-dialog v-for="(value, name) in list" :ref="name">
						<md-dialog-title>Are you sure you want to add {{ name }} innovation ?</md-dialog-title>
						<md-dialog-actions>
							<md-button class="md-accent" @click="closeDialog(name)">Cancel</md-button>
							<md-button class="md-accent" @click="addInnovation(name, value)">Ok</md-button>
						</md-dialog-actions>
					</md-dialog>

					<md-input-container>
						<label for="country">Innovation</label>
						<md-select @change="openDialog(innovation)" v-model="innovation">
							<md-option :value="name" v-for="(value, name) in list">{{ name }}</md-option>
						</md-select>
					</md-input-container>

					<md-list class="md-theme-default md-primary">
						<md-list-item v-for="(value, name) in list">
							<span>{{ name }}</span>
						</md-list-item>
					</md-list>
				</md-card-content>

			</md-card-area>
		</md-card>

		<md-card md-with-hover style="margin-top:1rem; cursor:default;">
			<md-whiteframe md-tag="md-toolbar" class="md-toolbar-container" md-elevation="5">
				<div class="md-title">
					<div class="md-toolbar-container">
						<h2 class="md-headline" style="flex: 1;"> Innovation</h2>
					</div>
				</div>
			</md-whiteframe>

			<md-card-content>
				<md-list class="md-theme-default md-primary">
					<md-list-item v-for="(value, name) in innovations">

						<md-dialog :ref="name">
							<md-dialog-title>Are you sure you want to delete {{ name }} innovation ?</md-dialog-title>
							<md-dialog-actions>
								<md-button class="md-accent" @click="closeDelDialog(name)">Cancel</md-button>
								<md-button class="md-accent" @click="deleteInnovation(name, value)">Ok</md-button>
							</md-dialog-actions>
						</md-dialog>

						<span>{{ name }}</span>

						<md-button @click="openDelDialog(name)" class="md-primary md-icon-button md-mini md-dense">
							<md-icon>delete_forever</md-icon>
						</md-button>

					</md-list-item>
				</md-list>
			</md-card-content>
		</md-card>

		<md-card md-with-hover style="margin-top:1rem; cursor:default;">
			<md-whiteframe md-tag="md-toolbar" class="md-toolbar-container" md-elevation="5">
				<div class="md-title">
					<div class="md-toolbar-container">
						<h2 class="md-headline" style="flex: 1;"> Principles</h2>
					</div>
				</div>
			</md-whiteframe>

			<md-card-content>
				<md-list class="md-theme-default md-primary">
					<md-layout md-gutter>
						<md-layout v-for="(row, title) in principles" md-flex-xsmall="100" md-flex-small="50" md-flex-medium="100" md-flex-large="100">
							<md-layout md-flex-xsmall="100" md-flex-small="20" md-flex-medium="30" md-flex-large="30">
								<h3 style="margin: 1rem 0px;">{{ title }}</h3>
							</md-layout>
							<!-- <md-layout v-for="(value, name) in row" md-flex-xsmall="100" md-flex-small="30" md-flex-medium="25" md-flex-large="25">
								<md-checkbox @change="addPrinciples(row, name, value)" v-model="value.status">{{ name }}</md-checkbox>
							</md-layout> -->
							<!-- {{ row[] }} -->
								<md-layout md-flex-xsmall="100" md-flex-small="25" md-flex-medium="25" md-flex-large="25">
									<md-checkbox @change="addPrinciples(title, pList[title][0], row[pList[title][0]].status)" v-model="row[pList[title][0]].status">{{ pList[title][0] }}</md-checkbox>
								</md-layout>
								<md-layout md-flex-small="10" md-flex-medium="10" md-flex-large="10" md-hide-xsmall>
									<b style="margin:1rem;">or</b>
								</md-layout>
								<md-layout md-flex-xsmall="100" md-flex-small="35" md-flex-medium="30" md-flex-large="30">
									<md-checkbox @change="addPrinciples(title, pList[title][1], row[pList[title][1]].status)" v-model="row[pList[title][1]].status">{{ pList[title][1] }}</md-checkbox>
								</md-layout>
							<md-divider style="width:100%"></md-divider>
						</md-layout>
					</md-layout>
					<!-- <md-divider class="md-inset"></md-divider> -->

					<!-- <md-list-item v-for="(value, name) in innovations"> -->

						<!-- <md-dialog :ref="name">
							<md-dialog-title>Are you sure you want to delete {{ name }} innovation ?</md-dialog-title>
							<md-dialog-actions>
								<md-button class="md-accent" @click="closeDelDialog(name)">Cancel</md-button>
								<md-button class="md-accent" @click="deleteInnovation(name, value)">Ok</md-button>
							</md-dialog-actions>
						</md-dialog>

						<span>{{ name }}</span>

						<md-button @click="openDelDialog(name)" class="md-primary md-icon-button md-mini md-dense">
							<md-icon>delete_forever</md-icon>
						</md-button> -->

					<!-- </md-list-item> -->
				</md-list>
			</md-card-content>
		</md-card>

	</div>

</template>

<script>

	import { mapState } from 'vuex'

	export default {

		data () {

			return {
				innovation: '',
				innovations: {},
				list: [],
				principles: {},
				pList: {"Conviction": [], "Death": [], "New Life": [], "Society": []},
				row: {}
				// principles: {
				// 	"New Life": {
				// 		"Protect the Young": {
				// 			status: false,
				// 			property: {}
				// 		},
				// 		"Survival of the Fittest": {
				// 			status: false,
				// 			property: {
				// 				s_limit: 1
				// 			}
				// 		}
				// 	},
				// 	"Death": {
				// 		"Cannibalize": {
				// 			status: false,
				// 			property: {
				// 				s_limit: 1
				// 			}
				// 		},
				// 		"Graves": {
				// 			status: false,
				// 			property: {}
				// 		}
				// 	},
				// 	"Society": {
				// 		"Collective Toil": {
				// 			status: false,
				// 			property: {}
				// 		},
				// 		"Accept Darkness": {
				// 			status: false,
				// 			property: {}
				// 		}
				// 	},
				// 	"Conviction": {
				// 		"Barbaric": {
				// 			status: false,
				// 			property: {
				// 				s_limit: 1,
				// 				str: 1
				// 			}
				// 		},
				// 		"Romantic": {
				// 			status: false,
				// 			property: {
				// 				s_limit: 1
				// 			}
				// 		}
				// 	},
				// },
			}
		},

		computed:
		{
			...mapState(['auth', 'settlement'])
		},

		mounted ()
		{
			this.getListInnovation()
			this.getPrinciplesInnovation()
			this.getSettlementInnovation()

			// this.updateInno()
		},

		methods:
		{
			// updateInno()
			// {
			// 	firebase.database().ref('settlementLocation').child(this.$route.params.key).update(this.locationCoreGame())
			// },

			openDialog(ref) {
				this.$refs[ref][0].open()
			},

			closeDialog(ref) {
				this.$refs[ref][0].close()
			},

			openDelDialog(ref) {
				this.$refs[ref][0].open()
			},

			closeDelDialog(ref) {
				this.$refs[ref][0].close()
			},

			getPrinciplesInnovation()
			{
				var pList = this.pList

				firebase.database().ref('settlementInnovation').child(this.$route.params.key).child("Principles").on('value', function(snapshot) {

					this.principles = snapshot.val()

					$.each(snapshot.val(), function(key, value) {
						$.each(value, function(key2, value2) {
							pList[key].push(key2)
						})
					})
					this.pList = pList

				}.bind(this))
			},

			getListInnovation()
			{
				firebase.database().ref('settlementInnovation').child(this.$route.params.key).orderByChild("dex").equalTo(1).on('value', function(snapshot) {

					this.list = snapshot.val()

				}.bind(this))
			},

			getSettlementInnovation()
			{
				firebase.database().ref('settlementInnovation').child(this.$route.params.key).orderByChild("status").equalTo(1).on('value', function(snapshot) {

					this.innovations = snapshot.val()

				}.bind(this))
			},

			addInnovation(innoName, value)
			{
				if(value["property"]) this.updatePropSettlement(value.property, 'add')
				var update = firebase.database().ref('settlementInnovation').child(this.$route.params.key).child(innoName).update({ status: 1, dex: 0 })

				this.getInnoConsequuence(innoName, 1)
				this.innovation = ''
				this.closeDialog(innoName)

				if(update) this.$refs.snackbar.open()
			},

			deleteInnovation(innoName, value)
			{
				var parent_inno = ''
				var parent_status = 1

				if(value["property"]) this.updatePropSettlement(value.property, 'delete')
				// if(Object.keys(value.property).length) this.updatePropSettlement(value.property, 'delete')

				firebase.database().ref('innovation').orderByChild('consequence').on('child_added', function(data)
				{
					data.val().consequence.forEach(function(value){
						if(value == innoName) parent_inno = data.key
					})
				})

				if(parent_inno)
				{
					firebase.database().ref('settlementInnovation').child(this.$route.params.key).child(parent_inno).child('status').once('value', function(snapshot) {
						parent_status = snapshot.val()
					})
				}

				var update = firebase.database().ref('settlementInnovation').child(this.$route.params.key).child(innoName).update({ status: 0, dex: (parent_status ? 1 : 0)})

				this.getInnoConsequuence(innoName, 0)
				this.closeDelDialog(innoName)
				if(update) this.$refs.snackbar.open()
			},

			getInnoConsequuence(innoName, value)
			{
				var settlementKey = this.$route.params.key

				firebase.database().ref('innovation').child(innoName).once('value', function(data) {
					data.val().consequence.forEach(function(name, key) {
						firebase.database().ref('settlementInnovation').child(settlementKey).child(name).update({ dex: value})
					})
				})
			},

			updatePropSettlement(property, type)
			{
				var authKey = this.settlement.owner
				var settlementKey = this.$route.params.key
				var surSkill = ['encorage', 'dash', 'surge']
				var $this = this

				$.each(property, function(name, value)
				{
					if(jQuery.inArray(name, surSkill) > -1)
					{
						firebase.database().ref('settlement').child(authKey).child(settlementKey).child(name).set((type == 'add' ? value : false))
					} else {
						var sum = 0
						firebase.database().ref('settlement').child(authKey).child(settlementKey).child(name).on('value', function(snapshot)
						{
							$this.row = snapshot.val()
						})
						sum = type == 'add' ? ($this.row.value + value) : ($this.row.value - value)
						firebase.database().ref('settlement').child(authKey).child(settlementKey).child(name).child('value').set(sum)
					}
				})
			},

			addPrinciples(title, innoName, value)
			{
				var authKey = this.settlement.owner
				var settlementKey = this.$route.params.key
				var $this = this
				value = value ? false : true

				firebase.database().ref('settlementInnovation').child(settlementKey).child("Principles").child(title).once("value", function(snapshot)
				{
					$.each(snapshot.val(), function(key, data)
					{
						if(key == innoName) {
						   firebase.database().ref('settlementInnovation').child(settlementKey).child("Principles").child(title).child(innoName).update({status: value})
						   if(data["property"])
						   {
							   $this.updatePropSettlement(data.property, (value ? 'add' : 'delete'))
						   }
					   	}
						else if(key != innoName && data.status) {
							firebase.database().ref('settlementInnovation').child(settlementKey).child("Principles").child(title).child(key).update({status: false})

							if(data.status && data["property"])
							{
								$this.updatePropSettlement(data.property, 'delete')
							}
						}
					})
				})
			}
		}

	}
</script>
