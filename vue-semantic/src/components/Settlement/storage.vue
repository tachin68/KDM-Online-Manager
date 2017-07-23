<template>
	<div class="ui basic segment container">

		<div v-on:click="getBasicResource" class="ui secondary inverted black segment">
			<div class="ui inverted fluid accordion">
				<div class="title">
					<i class="dropdown icon"></i>
					<b style="font-size: 1.28em;">Basic Resource</b>
				</div>
				<div class="content">
					<div  v-if="basic" v-for="(value, name) in basic" class="ui inverted list" style="padding-left:20px;">
						<div class="item">
							<div class="right floated content">
								<span style="color: #fff;font-size: 1.28em;padding: 0.48em;"><b>{{ value.count }}</b></span>
								<div v-on:click="updateCountResoruce('Basic Resource', name, value.count, '+')" class="ui tiny inverted circular blue button icon"><i class="ui plus icon"></i></div>
								<div v-on:click="updateCountResoruce('Basic Resource', name, value.count, '-')" class="ui tiny inverted circular red button icon"><i class="ui minus icon"></i></div>
							</div>
							<div style="font-size: 1.1em;">{{ name }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div v-on:click="getMonsterResource" class="ui secondary inverted black segment">
			<div class="ui inverted fluid accordion">
				<div class="title">
					<i class="dropdown icon"></i>
					<b style="font-size: 1.28em;">Monster Resource</b>
				</div>
				<div class="content">
					<div v-if="monsters" v-for="(items, monsName) in monsters" class="accordion" style="padding-left:20px;">
						<div class="title">
							<i class="dropdown icon"></i>
							<b style="font-size: 1.28em;">{{ monsName }}</b>
						</div>
						<div class="content">
							<div v-for="(value, itemName) in items" class="ui inverted list" style="padding-left:20px;">
								<div class="item">
									<div class="right floated content">
										<span style="color: #fff;font-size: 1.28em;padding: 0.48em;"><b>{{ value.count }}</b></span>
										<div v-on:click="updateMonsterCountResoruce(monsName, itemName, value.count, '+')" class="ui tiny inverted circular blue button icon"><i class="ui plus icon"></i></div>
										<div v-on:click="updateMonsterCountResoruce(monsName, itemName, value.count, '-')" class="ui tiny inverted circular red button icon"><i class="ui minus icon"></i></div>
									</div>
									<div style="font-size: 1.1em;">{{ itemName }}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div v-on:click="getStrangeResource" class="ui secondary inverted black segment">
			<div class="ui inverted fluid accordion">
				<div class="title">
					<i class="dropdown icon"></i>
					<b style="font-size: 1.28em;">Strange Resource</b>
				</div>
				<div class="content">
					<div  v-if="strange" v-for="(value, name) in strange" class="ui inverted list" style="padding-left:20px;">
						<div class="item">
							<div class="right floated content">
								<span style="color: #fff;font-size: 1.28em;padding: 0.48em;"><b>{{ value.count }}</b></span>
								<div v-on:click="updateCountResoruce('Strange Resource', name, value.count, '+')" class="ui tiny inverted circular blue button icon"><i class="ui plus icon"></i></div>
								<div v-on:click="updateCountResoruce('Strange Resource', name, value.count, '-')" class="ui tiny inverted circular red button icon"><i class="ui minus icon"></i></div>
							</div>
							<div style="font-size: 1.1em;">{{ name }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="ui secondary inverted black segment">
			<div class="ui inverted accordion">
				<div class="title">
					<i class="dropdown icon"></i>
					<b style="font-size: 1.28em;">Gears</b>
				</div>
				<div class="content">

					<div v-if="gears" v-for="(value, name) in gears" class="accordion" style="padding-left:20px;">
						<div class="ui divider"></div>
						<div class="title" v-on:click="getGearByLocation(name)">
							<i class="dropdown icon"></i>
							<b style="font-size: 1.28em;">{{ name }}</b>
						</div>
						<div class="content">
							<div v-for="(value, itemName) in gearValue" class="ui inverted list" style="padding-left:20px;">
								<div class="item">
									<div class="right floated content">
										<span style="color: #fff;font-size: 1.28em;padding: 0.48em;"><b>{{ value.count }}</b></span>
										<div v-on:click="updateGearsCount(name, itemName, value.count, '+')" class="ui tiny inverted circular blue button icon"><i class="ui plus icon"></i></div>
										<div v-on:click="updateGearsCount(name, itemName, value.count, '-')" class="ui tiny inverted circular red button icon"><i class="ui minus icon"></i></div>
									</div>
									<div style="font-size: 1.1em;">{{ itemName }}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

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
				basic: {},
				monsters: {},
				strange: {},
				gears : {
							'Barber Surgeon' : '',
							Blacksmith : '',
							'Bone Smith' : '',
							Catarium : '',
							'Leather Worker' : '',
							'Mask Maker' : '',
							'Organ Grinder' : '',
							Plummery : '',
							'Rare Gear' : '',
							Skinnery : '',
							'Starting Gear' : '',
							'Stone Circle' : '',
							'Weapon Crafter' : '' },
				gearValue: {}
			}
		},

		computed: {
			...mapState(['auth'])
		},

		mounted () {
console.log(this.gears)

			window.document.title = 'Storage'
			$('.ui.accordion').accordion();

		},

		methods: {

			getBasicResource() {

				firebase.database().ref('settlementStorage').child(this.$route.params.key).child('Resource').child('Basic Resource').on('value', function(snapshot) {

					this.basic = snapshot.val()

				}.bind(this))
			},

			getMonsterResource() {

				firebase.database().ref('settlementStorage').child(this.$route.params.key).child('Resource').child('Monster Resource').on('value', function(snapshot) {

					this.monsters = snapshot.val()

				}.bind(this))
			},

			getStrangeResource() {

				firebase.database().ref('settlementStorage').child(this.$route.params.key).child('Resource').child('Strange Resource').on('value', function(snapshot) {

					this.strange = snapshot.val()
					// console.log(snapshot.val())
				}.bind(this))
			},

			getGearByLocation(name) {

				firebase.database().ref('settlementStorage').child(this.$route.params.key).child('Gears').child(name).on('value', function(snapshot) {

					console.log(snapshot.val())
					this.gearValue = snapshot.val()

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
				if(count >= 0) firebase.database().ref('settlementStorage/'+this.$route.params.key+'/Gears/'+locationName+'/'+itemName).update({'count': count})

			}
		}

	}
</script>