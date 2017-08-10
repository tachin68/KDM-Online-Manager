<template>

	<div class="ui basic segment container text mdl-grid" style="margin-top: 1rem;">

		<md-card>
			<md-whiteframe md-tag="md-toolbar" class="md-toolbar-container" md-elevation="5">
				<div class="md-title">
					<div class="md-toolbar-container">
						<md-layout md-align="center">
							<h2 class="md-headline" style="flex: 1;">
								<img src="https://firebasestorage.googleapis.com/v0/b/kd-monster-online-sheet.appspot.com/o/lantern_48x48.png?alt=media&token=fb21135c-4a90-403b-b84c-dfdf04496f0e">
								Sign in
							</h2>
						</md-layout>
					</div>
				</div>
			</md-whiteframe>

			<md-card-header>
				<md-card-header-text>
					<md-layout md-gutter>
						<md-layout md-align="center">
						<!-- <md-layout md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33" md-align="center" md-column md-flex="40" md-flex-offset="30"> -->
							<button v-on:click="onSignInButtonClick" :class="{'ui google plus button' : true, 'loading': loading, 'disabled': disabled}"><i class="mail icon"></i> Sign In with Gmail</button>
						</md-layout>
					</md-layout>
				</md-card-header-text>
			</md-card-header>
		</md-card>
<!--
		<div class="ui inverted center aligned segment" v-on:submit.stop.prevent="createUser">
			<h3 class="ui header">
				<img src="https://firebasestorage.googleapis.com/v0/b/kd-monster-online-sheet.appspot.com/o/lantern_48x48.png?alt=media&token=fb21135c-4a90-403b-b84c-dfdf04496f0e" class="ui image">
				<div class="content">Sign up</div>
			</h3>
			<button v-on:click="onSignInButtonClick" class="ui google plus button"><i class="google plus icon"></i> Sign In with Google Plus</button>
		</div> -->

	</div>
</template>

<script>
	var provider = new firebase.auth.GoogleAuthProvider();

	import { mapState } from 'vuex'

	export default {

		data () {

			return {
				loading: false,
				disabled: false
			}
		},

		computed: {
			...mapState(['auth'])
		},

		mounted () {
			if(this.auth.login) this.$router.push({name: 'settlement'})
		},

		methods: {
			// getUser () {

			// 	firebase.database().ref('user').on('value', function(snapshot) {

			// 		this.items = snapshot.val()

			// 	}.bind(this))
			// },

			// createUser () {

			// 	var input = this.input
			// 	var beforeAdd = '';
			// 	firebase.database().ref('user').child(input.username).orderByKey().on("child_added", function(snapshot) {
			// 		beforeAdd = snapshot.val() ? true : false
			// 	}.bind(this))

			// 	if(beforeAdd)
			// 	{
			// 		alert('username นี้ถูกใช้แล้ว')
			// 	} else firebase.database().ref('user').child(input.username).child('password').set(input.password)
			// },

			onSignInButtonClick () {

				this.disabled = this.loading = true

				firebase.auth().signInWithPopup(provider).then(function(result) {

					var avatar = result.user.photoURL + '?sz=50'

					firebase.database().ref('email').orderByChild('name').equalTo(result.user.email).on('value', function(snapshot) {

						if (snapshot.val() === null)
						{
							var user  = firebase.database().ref('user').push({
								avatar: avatar,
								name: result.user.displayName,
								email: result.user.email,
								created_at: Date.now()
							})

							var email = firebase.database().ref('email').push({
								name: result.user.email,
								ref_user: user.key,
								created_at: Date.now()
							})

							// firebase.database().ref('email').child(email.key).update({ ref_user: user.key })

							var result = { login: true, key: user.key, avatar: avatar, name: result.user.displayName }
							this.$store.dispatch('authLogin', {result: result}).then(this.$router.push({name: 'settlement'}))

						} else {

							snapshot.forEach(function(child) {

								var key = child.val().ref_user

								firebase.database().ref('user').child(key).update({avatar: avatar})

								firebase.database().ref('user').child(key).on('value', function(snap) {

									var result = {login: true, key: key, avatar: snap.val().avatar, name: snap.val().name}
									localStorage.setItem('auth', JSON.stringify(result))

									this.$store.dispatch('authLogin', {result: result}).then(this.$router.push({name: 'settlement'}))

								}.bind(this))

							}.bind(this))
						}

					}.bind(this))

				}.bind(this))

			// this.loading = false

			}
		}
	}
</script>
