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
							<h2 class="md-headline" style="flex: 1;">Location</h2>
						</div>
					</div>
				</md-whiteframe>

				<md-card-content>
                    <pre>
                        {{ locations }}
                    </pre>
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
                locations: {}
			}
		},

		computed:
		{
			...mapState(['auth', 'settlement'])
		},

		mounted ()
		{
            this.getSettlementLocation()
		},

		methods:
		{
            getSettlementLocation()
            {
                firebase.database().ref('settlementLocation').child(this.$route.params.key).on('value', function(snapshot) {

                    this.locations = snapshot.val()

                }.bind(this))
            }
		}

	}
</script>
