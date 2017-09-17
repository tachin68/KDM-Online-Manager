<template>

	<div>
		<button v-on:click="onSignInButtonClick" class="ui button red">Login with Google</button>
	</div>

</template>

<script>

	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyAsf4rqvJ2ojK30nMJqn7zqK-QcHQvokqY",
		authDomain: "kd-monster-online-sheet.firebaseapp.com",
		databaseURL: "https://kd-monster-online-sheet.firebaseio.com",
		projectId: "kd-monster-online-sheet",
		storageBucket: "kd-monster-online-sheet.appspot.com",
		messagingSenderId: "746823342727"
	}

	firebase.initializeApp(config)

	var provider = new firebase.auth.GoogleAuthProvider()

	import { mapState } from 'vuex'

	export default {

		computed: {
			...mapState(['auth'])
		},

		methods:{

			onSignInButtonClick () {

				firebase.auth().signInWithPopup(provider).then(function(result) {

					var avatar = result.user.photoURL + '?sz=50'


					firebase.database().ref('email').orderByChild('name').equalTo(result.user.email).on('value', function(snapshot)
					{
						if (snapshot.val() == null)
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

							// firebase.database().ref('email').child(user.key).update({ ref_user: result.user.email })
							// firebase.database().ref('email').child(email.key).update({ ref_user: user.key })

							// var result = { login: true, key: user.key, avatar: avatar, name: result.user.displayName }
							// this.$store.dispatch('authLogin', {result: result}).then(this.$router.push({name: 'home'}))

						} else {

							snapshot.forEach(function(child) {

								var key = child.val().ref_user

								firebase.database().ref('user').child(key).update({avatar: avatar})

								firebase.database().ref('user').child(key).on('value', function(snap) {

									var result = {login: true, key: key, avatar: snap.val().avatar, name: snap.val().name, email: snap.val().email}
									localStorage.setItem('auth', JSON.stringify(result))

									this.$store.dispatch('authLogin', {result: result}).then(this.$router.push({name: 'settlement'}))

								}.bind(this))

							}.bind(this))
						}

					}.bind(this))

				}.bind(this))
			}
		}
	}

</script>