<template>

	<div :class="{ 'ui basic segment container': true, 'loading': rows.loading }">
<!-- <pre>{{ settlement }}</pre> -->
<!-- <pre>{{ auth.key }}</pre> -->
<!-- <pre>{{ access }}</pre> -->
<!-- <pre>{{ stroage }}</pre> -->

		<md-snackbar :md-position="'top right'" ref="snackbar" :md-duration="3000">
			<span>{{ shareStatus }}</span>
			<md-button class="md-accent" @click.native="$refs.snackbar.close()">OK</md-button>
		</md-snackbar>

		<span v-show="access">
			<form v-if="settlement.owner === auth.key" novalidate v-on:submit.stop.prevent="shareSettlement">
				<md-input-container>
					<label>Share Settlement (E-mail)</label>
			    	<md-input type="email" v-model="emailShare"></md-input>
				</md-input-container>
			</form>

			<!-- <router-link v-if="settlement.owner === auth.key" style="margin-left:0rem;" :to="'storage/'+id" class="md-button md-theme-default md-raised md-primary">Storage's {{ settlementName }}</router-link> -->
			<!-- <router-link v-if="settlement.owner === auth.key" style="margin-left:0rem;" :to="'survivors/'+id" class="md-button md-theme-default md-raised md-primary">Create Survivor</router-link> -->

			<div class="ui four stackable inverted grey tiny item menu">
				<!-- <span class="item" v-for="(data, key) in rows" v-if="data.name"><h4>{{ data.name }} : {{ data.value }}</h4></span> -->
				<span class="item"><h4>{{ rows.s_limit.name }} : {{ rows.s_limit.value }}</h4></span>
				<span class="item"><h4>{{ rows.depart.name }} : {{ rows.depart.value }}</h4></span>
				<span class="item"><h4>{{ rows.population.name }} : {{ rows.population.value }}</h4></span>
				<span class="item"><h4>{{ rows.dead.name }} : {{ rows.dead.value }}</h4></span>
			</div>

			<div class="ui secondary inverted black segment">
				<div class="ui inverted accordion">
					<div class="title">
						<i class="dropdown icon"></i>
						<b style="font-size: 1.28em;">Inovations ({{ innovations ? Object.keys(innovations).length : 0 }})</b>
					</div>
					<div class="content">
						<p v-for="(value, name) in innovations">- {{ name }}</p>
					</div>
				</div>
			</div>

			<div class="ui secondary inverted black segment">
				<div class="ui inverted accordion">
					<div class="title">
						<i class="dropdown icon"></i>
						<b style="font-size: 1.28em;">Locations ({{ locations ? Object.keys(locations).length : 0 }})</b>
					</div>
					<div class="content">
						<p v-for="(value, name) in locations">- {{ name }}</p>
						<!-- <p v-for="(value, key) in locations" v-if="value"><router-link :to="'settlement/location/'+key" style="font-size: 1.1em; color:#fff; font-weight: bold;">{{ key }}</router-link></p> -->
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
						<div style="margin-top:1rem;" class="ui six stackable inverted grey tiny item menu">
							<span class="item" v-for="(value, key) in stroage"><h4>{{ key }} : {{ value }}</h4></span>
						</div>

						<div class="ui internally celled grid">
							<div class="row" v-for="item in itemCount">
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
		</span>

		<div v-show="!access">Private Settlement</div>
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
				emailShare: '',
				shareStatus: '',
				access: false,
				settlementName: '',
				locations: {},
				stroage: {loading: true},
				itemCount: {},
				innovations: {},
				rows: {
					loading: true,
					s_limit: { name: 'Survival Limit', value: 1 },
					depart: { name: 'Depart', value:0 },
					population: { name:'Population', value: 0},
					dead: { name:'Dead', value: 0}
				}
			}
		},

		computed: {
			...mapState(['auth', 'settlement'])
		},

		mounted () {
			$('.ui.dropdown').dropdown()
			$('.ui.accordion').accordion()

			this.checkMember()
		},

		methods: {

			// share settlement with E-mail
			shareSettlement()
			{
				if(this.emailShare)
				{
					var userKey = ''
					var dun_have = false
					var have = false

					firebase.database().ref('user').orderByChild('email').equalTo(this.emailShare).on('child_added', function(snapshot)
					{
						userKey = snapshot.key

						if(userKey)
						{
							firebase.database().ref('settlementMember').child(this.$route.params.key).on('value', function(snapshot) {

								$.each(snapshot.val(), function(k, v) {
									(v == userKey) ? have = true : dun_have = true
								})

								if(!have && dun_have)
								{
									firebase.database().ref('settlementMember').child(this.$route.params.key).push(userKey)
									firebase.database().ref('user_has_settlement').child(userKey).child(this.$route.params.key).update({ name: this.settlementName })
									this.shareStatus = 'Share success.'
								} else this.shareStatus = 'You have already share this email.'

							}.bind(this))

						} else this.shareStatus = 'Email not found.'

						this.$refs.snackbar.open()
						this.emailShare = ''

					}.bind(this))
				}
			},

			getSettlementInnovation()
			{
				firebase.database().ref('settlementInnovation').child(this.$route.params.key).orderByChild("status").equalTo(1).on('value', function(snapshot) {

					this.innovations = snapshot.val()

				}.bind(this))
			},

			firstUpper(str) {
				return str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
					return letter.toUpperCase();
				})
			},

			checkMember()
			{
				firebase.database().ref('settlementMember').child(this.$route.params.key).orderByValue().equalTo(this.auth.key).on('value', function(snapshot) {

					if(snapshot.val())
					{
						this.getSettlement()
					} else {
						firebase.database().ref('settlement').child(this.auth.key).child(this.$route.params.key).on('value', function(snapshot) {
							if(snapshot.val().owner == this.auth.key)
							{
								var result = {key: snapshot.key, owner: snapshot.val().owner, name: snapshot.val().name}

								this.$store.dispatch('getSettlement', {result: result})

								window.document.title 	= snapshot.val().name
								this.rows				= snapshot.val()
								this.settlementName		= snapshot.val().name
								this.access				= true

								localStorage.setItem('settlement', JSON.stringify(snapshot.val()))

								this.getSettlementLocation()
								this.getSettlementInnovation()

							} else this.$store.dispatch('setSettlementIndex')

						}.bind(this))
					}

				}.bind(this))

			},

			getSettlement () {

				firebase.database().ref('settlement').orderByChild(this.$route.params.key).on('child_added', function(snapshot)
				{
					firebase.database().ref('settlement').child(snapshot.key).child(this.$route.params.key).on('value', function(snapshot)
					{
						var result = {key: snapshot.key, owner: snapshot.val().owner, name: snapshot.val().name}

						localStorage.setItem('settlement', JSON.stringify(snapshot.val()))
						this.$store.dispatch('getSettlement', {result: result})

						window.document.title 	= snapshot.val().name
						this.rows				= snapshot.val()
						this.settlementName		= snapshot.val().name
						this.access				= true


						this.getSettlementLocation()
						this.getSettlementInnovation()

					}.bind(this))

				}.bind(this))
			},

			getSettlementLocation () {

				firebase.database().ref('settlementLocation').child(this.$route.params.key).orderByChild("status").equalTo(1).on('value', function(snapshot) {

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
