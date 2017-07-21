<template>

	<div class="ui basic segment container">
		<!-- {{ auth }} -->
		<!-- <form class="ui inverted form segment" v-on:submit.stop.prevent="" style="">

			<h3 class="ui header">
				<img src="https://68.media.tumblr.com/avatar_bd70160a9028_48.png" class="ui image">
				<div class="content">Inovation</div>
			</h3>
			<div class="field">
				<div class="ui action right labeled icon input">
					<input type="text" placeholder="Settlement Name" v-model="input.name">
					<button class="ui icon button" type="submit"><i class="plus icon"></i></button>
				</div>
			</div>
		</form> -->
<!--
		<pre>
			{{ items }}
		</pre> -->
<!--
		<table class="ui inverted large unstackable table">
			<thead>
				<tr>
					<th colspan="2">Location</th>
				</tr>
			</thead>
			<tbody>
				<tr v-if="items" v-for="name in items">
					<td><router-link to="#" style="color:#fff; font-weight: bold;">{{ name }}</router-link></td>
					<td class="right aligned"><a class="ui button mini circular icon" v-on:click="deleteItem(key)"><i class="close icon"></i></a></td>
				</tr>
			</tbody>
		</table> -->

		<router-link :to="'storage/'+id" class="ui black button">Storage's {{ settlementName }}</router-link>
		<router-link :to="'survivors/'+id" class="ui black button">Create Survivor</router-link>

		<div class="ui four stackable inverted grey tiny item menu">
			<!-- <span class="item" v-for="(data, key) in rows" v-if="data.name"><h4>{{ data.name }} : {{ data.value }}</h4></span> -->
			<span class="item"><h4>{{ rows.survival_limit.name }} : {{ rows.survival_limit.value }}</h4></span>
			<span class="item"><h4>{{ rows.depart.name }} : {{ rows.depart.value }}</h4></span>
			<span class="item"><h4>{{ rows.population.name }} : {{ rows.population.value }}</h4></span>
			<span class="item"><h4>{{ rows.dead.name }} : {{ rows.dead.value }}</h4></span>
		</div>

		<div class="ui secondary inverted black segment">
			<div class="ui inverted accordion">
				<div class="title">
					<i class="dropdown icon"></i>
					<b style="font-size: 1.28em;">Inovations</b>
				</div>
				<div class="content">
					<p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
				</div>
			</div>
		</div>

		<div class="ui secondary inverted black segment">
			<div class="ui inverted accordion">
				<div class="title">
					<i class="dropdown icon"></i>
					<b style="font-size: 1.28em;">Locations</b>
				</div>
				<div class="content" style="padding-left:20px;">
					<p v-for="(value, key) in locations" v-if="value"><router-link :to="'settlement/location/'+key" style="font-size: 1.1em; color:#fff; font-weight: bold;">{{ key }}</router-link></a></p>
				</div>
			</div>
		</div>

		<div v-if="stroage" v-on:click="getSettlementStorage" class="ui secondary inverted black segment">
			<div class="ui inverted accordion">
				<div class="title">
					<i class="dropdown icon"></i>
					<b style="font-size: 1.28em;">Storage</b>
				</div>
				<div class="content">
					<div class="ui grid container">
						<!-- <div v-if="stroage" v-for="(value, key) in stroage" class="three centered wide mobile eight wide tablet two wide computer column">
							<div class="ui labeled inverted button">
								<div class="ui inverted tiny basic red button">{{ key }}</div>
								<a class="ui basic red left pointing label">{{ value }}</a>
							</div>
							<span class="item" ><h4>{{ key }} : {{ value }}</h4></span>
						</div> -->
						<div style="margin-top:1rem;" class="ui six stackable inverted grey tiny item menu">
							<span class="item" v-for="(value, key) in stroage"><h4>{{ key }} : {{ value }}</h4></span>
						</div>

						<div class="ui internally celled grid">
							<div class="row"  v-for="item in itemCount">
								<div class="fourteen wide column">
									<label>{{ item.name }}</label> - <span v-for="(value, key) in item.type"> {{ firstUpper(value)+',' }} </span>
								</div>
								<div class="two wide column">
									<h4>{{ item.value }}</h4>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
<!--
		<div v-on:click="getSettlementStorage" class="ui styled padded inverted segment">
			<div class="ui inverted accordion">
				<div class="title">
					<i class="dropdown icon"></i>
					<b style="font-size: 1.28em;">Storage</b>
				</div>
				<div class="content">
					<div v-if="stroage" v-for="(value, key) in stroage" class="ui inverted large horizontal list">
						<div class="item">
							<div class="content">
								<span style="color: #fff;font-size: 1.28em;padding: 0.48em;">{{ key }}</span>
								<div class="header" style="color: #fff;font-size: 1.28em;padding: 0.48em;">{{ value }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div> -->
	</div>
</template>
<script>

	import { mapState } from 'vuex'

	export default {

		data () {

			return {
				id: this.$route.params.key,
				i: 0,
				settlementName: '',
				locations: {},
				stroage: {},
				itemCount: {},
				rows: {
					survival_limit: { name: 'Survival Limit', value: 1 },
					depart: { name: 'Depart', value:0 },
					population: { name:'Population', value: 0},
					dead: { name:'Dead', value: 0}
				}
			}
		},

		computed: {
			...mapState(['auth'])
		},

		mounted () {
			$('.ui.dropdown').dropdown();
			$('.ui.accordion').accordion();

			this.getSettlement()
			this.getSettlementLocation()
		},

		methods: {
			firstUpper(str) {
				return str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
				    return letter.toUpperCase();
				})
			},

			getSettlement () {

				firebase.database().ref('settlement').child(this.auth.key).child(this.$route.params.key).on('value', function(snapshot) {

					this.rows = snapshot.val()

					window.document.title	= snapshot.val().name
					this.settlementName		= snapshot.val().name

				}.bind(this));

			},

			getSettlementLocation () {
				// this.url = document.URL
				firebase.database().ref('settlementLocation').child(this.$route.params.key).on('value', function(snapshot) {
					// console.log(snapshot.val())
					this.locations = snapshot.val()

				}.bind(this))
			},

			getSettlementStorage () {

				firebase.database().ref('settlementStorage').child(this.$route.params.key).child('Resource').on('value', function(snapshot) {

					var itemCount = []
					var type = { 'Bone':0, 'Hide':0, 'Organ':0, 'Scrap':0, 'Iron':0, 'Herb':0 }

					$.each(snapshot.val() , function (key, value) {

						if(key != 'Monster Resource') {
							$.each(value , function (keys, values) {

								if(values.count) itemCount.push({name: keys, type: values.type, value: values.count})

								$.each(values.type , function (key2, value2) {

									if(key2 == 'bone')  type.Bone += values.count
									if(key2 == 'hide')  type.Hide += values.count
									if(key2 == 'organ')  type.Organ += values.count
									if(key2 == 'scrap')  type.Scrap += values.count
									if(key2 == 'iron')  type.Iron += values.count
									if(key2 == 'herb')  type.Herb += values.count
								})
							})
						} else {
							$.each(value , function (keys, valus) {

								$.each(valus , function (key2, value2) {

									if(value2.count) itemCount.push({name: key2, type: value2.type, value: value2.count})

									$.each(value2.type , function (key3, value3) {

										if(key3 == 'bone')  type.Bone += value2.count
										if(key3 == 'hide')  type.Hide += value2.count
										if(key3 == 'organ')  type.Organ += value2.count
										if(key3 == 'scrap')  type.Scrap += value2.count
										if(key3 == 'iron')  type.Iron += value2.count
										if(key3 == 'herb')  type.Herb += value2.count
									})
								})
							})
						}
					})

					this.stroage = type
					this.itemCount = itemCount

				}.bind(this))
			}
		}

	}
</script>