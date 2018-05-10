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
							<md-table-head>No</md-table-head>
							<md-table-head>Name</md-table-head>
							<md-table-head>Delete</md-table-head>
						</md-table-row>
					</md-table-header>

					<md-table-body>
						<md-table-row v-for="(row, key) in party">
							<md-table-cell>{{ key + 1 }}</md-table-cell>
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
			</md-card-content>

			<!-- <md-tabs v-if="survivor" @change="changeTabs"> -->
			<md-tabs>
				<md-tab md-label="Stats">
					<md-card-content>
						<pre>
							{{ survivor_list }}
						</pre>
					</md-card-content>
					<!-- <div class="ui grid phone-viewport">
						<div class="sixteen wide column">
							<md-switch v-model="survivor.Dead" @change="changeSurvivorData('Dead')" class="md-primary md-theme-about">Dead</md-switch>
							<md-switch v-model="survivor.Spend" @change="changeSurvivorData('Spend')" class="md-primary md-theme-about">Spend Survival</md-switch>
						</div>
						<div class="mobile sixteen wide column computer eight wide column">
							<md-input-container class="md-accent md-theme-default">
								<label>Name</label>
								<md-input type="text" v-model="survivor.Name" @blur="changeSurvivorData('Name')"></md-input>
							</md-input-container>
							<md-input-container class="md-accent md-theme-default">
								<label>Surname</label>
								<md-input type="text" v-model="survivor.Surname" @blur="changeSurvivorData('Surname')"></md-input>
							</md-input-container>
							<md-input-container class="md-accent md-theme-default">
								<label for="survivor.Gender">Gender</label>
								<md-select name="survivor.Gender" v-model="survivor.Gender" @change="changeSurvivorData('Gender')">
									<md-option value="0">Female</md-option>
									<md-option value="1">Male</md-option>
								</md-select>
							</md-input-container>
							<md-input-container class="md-accent md-theme-default">
								<label for="survivor.Xp">Hunt XP</label>
								<md-select name="survivor.Xp" v-model="survivor.Xp" @change="changeSurvivorData('Xp')">
									<md-option v-for="(value, key) in huntExp" :value="key">{{value}}</md-option>
								</md-select>
							</md-input-container>
						</div>

						<div v-show="survivor.Xp == 2" class="mobile sixteen wide column computer eight wide column">
							<md-input-container class="md-accent md-theme-default">
								<label>Weapon Proficiency</label>
								<md-select v-model="survivor['Weapon Proficiency'].type" @change="changeSurvivorData('Weapon Proficiency')">
									<md-option v-for="(value, key) in weaponProficiency" :value="key">{{value}}</md-option>
								</md-select>
							</md-input-container>
							<md-input-container class="md-accent md-theme-default">
								<label>Weapon Proficiency EXP</label>
								<md-select v-model="survivor['Weapon Proficiency'].xp" @change="changeSurvivorData('Weapon Proficiency')">
									<md-option v-for="(value, key) in weaponExp" :value="key">{{value}}</md-option>
								</md-select>
							</md-input-container>
						</div>

						<div class="sixteen wide column">
							<md-layout md-gutter v-for="key in objKeys">
								<md-layout md-flex-xsmall="55" md-flex-small="60" md-flex-medium="80" md-flex-large="90" md-flex-xlarge="90">
									<md-input-container class="md-accent md-theme-default">
										<label>{{ key }}</label>
										<md-input type="text" v-model="survivor[key]"></md-input>
									</md-input-container>
								</md-layout>

								<md-layout md-flex-xsmall="45" md-flex-small="40" md-flex-medium="20" md-flex-large="10" md-flex-xlarge="10">
									<md-button v-on:click="updateStatusCount(key, '+')" class="md-icon-button md-mini md-raised md-accent">
										<md-icon>add</md-icon>
									</md-button>

									<md-button v-on:click="updateStatusCount(key, '-')" md-theme="about" class="md-icon-button md-mini md-raised md-accent">
										<md-icon>remove</md-icon>
									</md-button>
								</md-layout>
							</md-layout>
						</div>
					</div> -->
				</md-tab>

				<md-tab md-label="Fighting Arts">
					<!-- <fighting-arts v-show="viewFightingArts" :surId="surId"></fighting-arts> -->
				</md-tab>

				<md-tab md-label="Disorders">
					<!-- <disorders v-show="viewDisorders" :surId="surId"></disorders> -->
				</md-tab>

				<md-tab md-label="Courage">
					<!-- <courage v-show="viewCourage" :surId="surId"></courage> -->
				</md-tab>

				<md-tab md-label="Understanding">
					<!-- <understanding v-show="viewUnderstanding" :surId="surId"></understanding> -->
				</md-tab>
			</md-tabs>
		</md-card>

	</div>
</template>

<script>

	import { mapState } from 'vuex'

	export default {

		data () {

			return {
				survivor_list: [],
				select: '',
				party: {}
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
				console.log(this.party.length)
				!jQuery.isEmptyObject(this.party) ? this.party.push(array) : this.party = array
				console.log(this.party)
				delete this.survivor_list[select]
				this.select = ''
				// delete this.survivor_list.splice(select, 1);

			},

			removePrepareParty(key)
			{

			},


			disband_party()
			{
				this.getSettlementSurvivor()
			}
			//
			// addNemesis()
			// {
			// 	this.input.nemesis.push({ name: '', 'LV1': false, 'LV2': false, 'LV3': false, status: false })
			// },
			//
			// save()
			// {
			// 	var update = firebase.database().ref('settlementMonsters').child(this.$route.params.key).update(this.input)
			// 	if(update) this.$refs.snackbar.open()
			// }
		}

	}
</script>
