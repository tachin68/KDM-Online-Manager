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
							<h2 class="md-headline" style="flex: 1;">Quarries</h2>
						</div>
					</div>
				</md-whiteframe>

				<md-card-content>
					<md-list>
						<md-layout>
							<md-list-item v-for="(row, key) in input.monsters">
								<md-checkbox v-model="row.status"></md-checkbox>

								<md-input-container md-inline>
									<label>Monster Name</label>
									<md-textarea v-model="row.name"></md-textarea>
								</md-input-container>
							</md-list-item>
						</md-layout>
					</md-list>

					<md-button @click="addMonster" class="md-icon-button md-raised md-accent">
						<md-icon>add</md-icon>
					</md-button>

					<md-button @click="save" md-theme="about" class="md-icon-button md-raised md-accent">
						<md-icon>save</md-icon>
					</md-button>
				</md-card-content>
			</md-card-area>
		</md-card>

		<md-card md-with-hover style="margin-top:1rem;cursor:default;">
			<md-card-area md-inset>
				<md-whiteframe md-tag="md-toolbar" class="md-toolbar-container">
					<div class="md-title">
						<div class="md-toolbar-container">
							<h2 class="md-headline" style="flex: 1;">Nemesis Monster</h2>
						</div>
					</div>
				</md-whiteframe>

				<md-card-content>
					<md-list>
						<md-layout>
							<md-list-item v-for="(row, key) in input.nemesis">
								<div class="ui grid">
									<div class="one wide column" style="padding-top:1.7rem;">
										<md-checkbox v-model="row.status"></md-checkbox>
									</div>

									<div class="thirteen wide column">
										<md-input-container md-inline style="margin-bottom:0rem;">
											<label>Nemesis monster name</label>
											<md-textarea v-model="row.name"></md-textarea>
										</md-input-container>

										<md-layout>
											<md-checkbox v-model="row.LV1">LV1</md-checkbox>
											<md-checkbox v-model="row.LV2">LV2</md-checkbox>
											<md-checkbox v-model="row.LV3">LV3</md-checkbox>
										</md-layout>
									</div>
								</div>
							</md-list-item>
						</md-layout>
					</md-list>

					<md-button @click="addNemesis" class="md-icon-button md-raised md-accent">
						<md-icon>add</md-icon>
					</md-button>

					<md-button @click="save" md-theme="about" class="md-icon-button md-raised md-accent">
						<md-icon>save</md-icon>
					</md-button>
				</md-card-content>
			</md-card-area>
		</md-card>

	</div>
</template>

<script>

	import { mapState } from 'vuex'

	export default {

		data () {

			return {
				input: {
					monsters: [],
					nemesis: []
				}
			}
		},

		computed:
		{
			...mapState(['auth'])
		},

		mounted ()
		{
			this.getSettlementMonsters()
		},

		methods:
		{
			getSettlementMonsters()
			{
				firebase.database().ref('settlementMonsters').child(this.$route.params.key).on('value', function(snapshot) {

					if(snapshot.val()) this.input = snapshot.val()

				}.bind(this))
			},

			addMonster()
			{
				this.input.monsters.push({ name: 'Monster Name', status: false })
			},

			addNemesis()
			{
				this.input.nemesis.push({ name: '', 'LV1': false, 'LV2': false, 'LV3': false, status: false })
			},

			save()
			{
				var update = firebase.database().ref('settlementMonsters').child(this.$route.params.key).update(this.input)
				if(update) this.$refs.snackbar.open()
			}
		}

	}
</script>
