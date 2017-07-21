<template>
	<div class="ui basic segment container">

		<button v-on:click="onResource" class="ui inverted button"><i class="plus icon"></i> Resource</button>

		<h3 v-if="resource" class="ui inverted header">
			Basic Resource
		</h3>
<!--
		<table class="ui selectable inverted table">
			<tbody v-if="resource" v-for="(value, name) in resource" >
				<tr>
					<td>
						<h4 class="ui inverted image header">
							<img class="ui custom mini rounded centered image" v-bind:src="value.image" />
							<div class="content">
								<router-link :to="'resource/basic/'+name" style="color:#fff; font-weight: bold;">{{ value.name }}</router-link>
								<div class="sub header"><i v-html="value.type"></i></div>
								<div class="sub header"><p v-html="value.detail"></p></div>
							</div>
						</h4>
					</td>
				</tr>

			</tbody>
		</table> -->

<!-- หนังสือ -->
<!-- 📖 -->
<!-- ดายไขว้ -->
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
				items: {},
				key: (this.$route.params.key === 'unknown' ? '???' : this.$route.params.key),
				resource: {}
			}
		},

		computed: {
			...mapState(['auth'])
		},

		mounted () {
			window.document.title = ''+this.$route.params.show

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

			// this.getSettlement()
			console.log(this.$route.params.key)
			console.log(this.$route.params.show)
		},

		methods: {

			getSettlement() {

				firebase.database().ref('settlement').on('value', function(snapshot) {

					this.items = snapshot.val()

				}.bind(this))
			},

			onResource() {

				firebase.database().ref('itemResource').child('Basic Resource').on('value', function(snapshot) {

					this.resource = snapshot.val()

				}.bind(this))
			},

		}

	}
</script>