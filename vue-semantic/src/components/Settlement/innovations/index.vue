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
	</div>

</template>

<script>

	import { mapState } from 'vuex'

	export default {

		data () {

			return {
				innovation: '',
				innovations: {},
				list: []
			}
		},

		computed:
		{
			...mapState(['auth', 'settlement'])
		},

		mounted ()
		{
			this.getListInnovation()
			this.getSettlementInnovation()
		},

		methods:
		{
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

				$.each(property, function(name, value)
				{
					if(jQuery.inArray(name, surSkill) > -1)
					{
						firebase.database().ref('settlement').child(authKey).child(settlementKey).child(name).set((type == 'add' ? value : false))
					} else {
						firebase.database().ref('settlement').child(authKey).child(settlementKey).child(name).once('value', function(snapshot)
						{
							var sum = type == 'add' ? (snapshot.val().value + value) : (snapshot.val().value - value)
							firebase.database().ref('settlement').child(authKey).child(settlementKey).child(name+"/value").set(sum)
						}.bind(this))
					}
				})
			}
		}

	}
</script>
