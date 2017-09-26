<template>
	<div class="ui basic segment container">

		<div @click="getStorageGear" class="ui secondary inverted black segment">
			<div class="ui inverted accordion">
				<div class="title">
					<i class="dropdown icon"></i>
					<b style="font-size: 1.28em;">Gears</b>
				</div>
				<div class="content">
					<div v-if="gears" v-for="(items, name) in gears" class="accordion" style="padding-left:20px;">
						<div class="ui divider"></div>
						<div class="title">
							<i class="dropdown icon"></i>
							<b style="font-size: 1.28em;">{{ name }}</b>
						</div>
						<div class="content">
							<div v-for="(value, itemName) in items" class="ui inverted list" style="padding-left:20px;">
								<div class="item" style="line-height: 2em;">
									<div class="right floated content" style="line-height: 2em;">
										<span style="color: #fff;font-size: 1.28em;padding: 0.48em;"><b>{{ value.count }}</b></span>
										<md-button @click="updateGearsCount(name, itemName, value.count, '+')" class="md-dense md-icon-button md-raised md-accent">
											<md-icon>add</md-icon>
										</md-button>
										<md-button @click="updateGearsCount(name, itemName, value.count, '-')" md-theme="about" class="md-dense md-icon-button md-raised md-accent">
											<md-icon>remove</md-icon>
										</md-button>
										<!-- <div v-on:click="updateGearsCount(name, itemName, value.count, '+')" class="ui tiny inverted circular blue button icon"><i class="ui plus icon"></i></div> -->
										<!-- <div v-on:click="updateGearsCount(name, itemName, value.count, '-')" class="ui tiny inverted circular red button icon"><i class="ui minus icon"></i></div> -->
									</div>
									<div style="font-size: 1.1em;">{{ itemName }}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>

	import { mapState } from 'vuex'

	export default {

		data () {

			return {
				gears : {}
			}
		},

		computed: {
			...mapState(['auth'])
		},

		mounted () {
			window.document.title = 'Storage'
			$('.ui.accordion').accordion();

		},

		methods: {

			getStorageGear() {

				firebase.database().ref('settlementStorageGear').child(this.$route.params.key).on('value', function(snapshot) {

					this.gears = snapshot.val()

				}.bind(this))
			},

			updateCountResoruce(groupResoruce, itemName, count, type) {

				count = (type === '+') ? count + 1 : count - 1
				if(count >= 0) firebase.database().ref('settlementStorage/'+this.$route.params.key+'/Resource/'+groupResoruce+'/'+itemName).update({'count': count})

			},

			updateMonsterCountResoruce(monsName, itemName, count, type) {

				count = (type === '+') ? count + 1 : count - 1
				if(count >= 0) firebase.database().ref('settlementStorage/'+this.$route.params.key+'/Resource/Monster Resource/'+monsName+'/'+itemName).update({'count': count})

			},

			updateGearsCount(locationName, itemName, count, type) {

				count = (type === '+') ? count + 1 : count - 1
				if(count >= 0) firebase.database().ref('settlementStorageGear/'+this.$route.params.key+'/'+locationName+'/'+itemName).update({'count': count})

			}
		}

	}
</script>
