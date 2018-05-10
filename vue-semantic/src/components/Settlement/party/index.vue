<template>
	<div class="ui basic segment container">
		<md-snackbar :md-position="'top right'" ref="snackbar" :md-duration="3000">
			<span>Update Success.</span>
			<md-button class="md-accent" @click.native="$refs.snackbar.close()">OK</md-button>
		</md-snackbar>

		<md-card md-with-hover style="cursor:default;">

			<md-whiteframe md-tag="md-toolbar" class="md-toolbar-container">
				<div class="md-title">
					<div class="md-toolbar-container">
						<h2 class="md-headline" style="flex: 1;">Party</h2>
					</div>
				</div>
			</md-whiteframe>
			<md-card-content>
				<div class="ui grid phone-viewport">
					<div class="mobile sixteen wide column computer eight wide column">
						<md-input-container class="md-accent md-theme-default">
							<label>Select Survivor</label>
							<md-select v-model="select" @change="addPrepareParty(select)">
								<md-option v-for="(row, key) in survivor_list" :value="key">{{ row.Name +' '+ row.Surname }}</md-option>
							</md-select>
						</md-input-container>
					</div>
				</div>
			</md-card-content>

			<md-whiteframe md-tag="md-toolbar" class="md-toolbar-container" md-elevation="5">
				<div class="md-title">
					<div class="md-toolbar-container">
						<h2 class="md-headline" style="flex: 1;"> Survivor</h2>
					</div>
				</div>
			</md-whiteframe>
			<md-card-content>
				<md-table>
					<md-table-header>
						<md-table-row>
							<md-table-head>Name</md-table-head>
							<md-table-head>Delete</md-table-head>
						</md-table-row>
					</md-table-header>

					<md-table-body>
						<md-table-row v-for="(row, key) in party">
							<md-table-cell>{{ row.Name +' '+ row.Surname }}</md-table-cell>
							<md-table-cell>
								<md-button md-theme="about" class="md-icon-button md-list-action" @click="openDialog(key)">
									<i class="md-icon material-icons md-theme-default">delete_forever</i>
								</md-button>

								<md-dialog :ref="key">
									<md-dialog-title>Are you sure you want to delete this survivor ?</md-dialog-title>
									<md-dialog-actions>
										<md-button class="md-accent" @click="closeDialog(key)">Cancel</md-button>
										<md-button class="md-accent" @click="removePrepareParty(key)">Ok</md-button>
									</md-dialog-actions>
								</md-dialog>
							</md-table-cell>
						</md-table-row>
					</md-table-body>
				</md-table>
				<div class="ui divider"></div>

				<button @click="showTabs = true" class="ui fluid button">Create Party</button>

			</md-card-content>

			<md-tabs v-show="showTabs">
				<viewtabs v-for="(row, key) in party" :row="row"></viewtabs>
			</md-tabs>

			<!-- <md-tabs>
				<md-tab v-for="(row, key) in party" :md-label="row.Name">
					<md-card-content>
					</md-card-content>
				</md-tab>
			</md-tabs> -->
		</md-card>
	</div>
</template>

<script>

	import { mapState } from 'vuex'

	import viewtabs from './view.vue'

	export default {

		data () {

			return {
				survivor_list: {},
				select: '',
				party: {},
				showTabs: false
			}
		},

		computed:
		{
			...mapState(['auth'])
		},

		mounted ()
		{
			this.getSettlementSurvivor()
		},

		methods:
		{
			openDialog(ref) {
				this.$refs[ref][0].open()
			},

			closeDialog(ref) {
				this.$refs[ref][0].close()
			},

			getSettlementSurvivor()
			{
				firebase.database().ref('settlementSurvivor').child(this.$route.params.key).on('value', function(snapshot) {

					this.survivor_list = snapshot.val()
					this.select = ''
					this.party = []

				}.bind(this))
			},

			addPrepareParty(select)
			{
				var array = {}
				array[select] = this.survivor_list[select]
				!jQuery.isEmptyObject(this.party) ? $.extend(this.party, array) : this.party = array
				this.select = ''
				delete this.survivor_list[select]
				if(jQuery.isEmptyObject(this.survivor_list)) this.survivor_list = {}
				// delete this.survivor_list.splice(select, 1);

			},

			removePrepareParty(key)
			{
				var array = {}
				array[key] = this.party[key]
				!jQuery.isEmptyObject(this.survivor_list) ? $.extend(this.survivor_list, array) : this.survivor_list = array
				this.select = ''
				delete this.party[key]
				if(jQuery.isEmptyObject(this.party)) this.party = []
				this.closeDialog(key)
			},

			disband_party()
			{
				this.getSettlementSurvivor()
			},

			createParty() {
				this.showTabs = true
			}
		},

		components: { viewtabs }
	}
</script>
