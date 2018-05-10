<template>

	<div>
		<md-sidenav class="md-left md-fixed" ref="sidebar">

			<md-toolbar class="md-account-header">
				<md-list class="md-transparent">
					<md-list-item>
						<md-avatar>
							<img v-bind:src="auth.avatar">
						</md-avatar>
						<span>{{ auth.name }}</span>
					</md-list-item>
				</md-list>
			</md-toolbar>

			<md-list>

				<li @click="$refs.sidebar.toggle()" class="md-list-item">
					<router-link to="/settlement" class="md-button md-button md-list-item-container md-theme-default">
						<div class="md-list-item-holder"><i class="md-icon material-icons md-theme-default">home</i> <span>Home</span></div>
					</router-link>
				</li>

				<li v-show="this.$route.params.key" @click="$refs.sidebar.toggle()" class="md-list-item">
					<router-link :to="'/settlement/'+this.$route.params.key" class="md-button md-button md-list-item-container md-theme-default">
						<div class="md-list-item-holder"><i class="md-icon material-icons md-theme-default">location_city</i> <span>Settlement</span></div>
					</router-link>
				</li>

				<li v-show="this.$route.params.key" @click="$refs.sidebar.toggle()" class="md-list-item">
					<router-link :to="'/settlement/timeline/'+this.$route.params.key" class="md-button md-button md-list-item-container md-theme-default">
						<div class="md-list-item-holder"><i class="md-icon material-icons md-theme-default">event_note</i> <span>Timeline</span></div>
					</router-link>
				</li>

				<li v-show="this.$route.params.key" @click="$refs.sidebar.toggle()" class="md-list-item">
					<router-link :to="'/settlement/locations/'+this.$route.params.key" class="md-button md-button md-list-item-container md-theme-default">
						<div class="md-list-item-holder"><i class="md-icon material-icons md-theme-default">location_searching</i> <span>Locations</span></div>
					</router-link>
				</li>

				<li v-show="this.$route.params.key" @click="$refs.sidebar.toggle()" class="md-list-item">
					<router-link :to="'/settlement/innovations/'+this.$route.params.key" class="md-button md-button md-list-item-container md-theme-default">
						<div class="md-list-item-holder"><i class="md-icon material-icons md-theme-default">layers</i> <span>Innovations</span></div>
					</router-link>
				</li>

				<li v-show="this.$route.params.key" @click="$refs.sidebar.toggle()" class="md-list-item">
					<router-link :to="'/settlement/monsters/'+this.$route.params.key" class="md-button md-button md-list-item-container md-theme-default">
						<div class="md-list-item-holder"><i class="md-icon material-icons md-theme-default">whatshot</i> <span>Monster</span></div>
					</router-link>
				</li>

				<li v-show="this.$route.params.key" @click="$refs.sidebar.toggle()" class="md-list-item">
					<router-link :to="'/settlement/storage/'+this.$route.params.key" class="md-button md-button md-list-item-container md-theme-default">
						<div class="md-list-item-holder"><i class="md-icon material-icons md-theme-default">store_mall_directory</i> <span>Storage</span></div>
					</router-link>
				</li>

				<li v-show="this.$route.params.key" @click="$refs.sidebar.toggle()" class="md-list-item">
					<router-link :to="'/settlement/survivors/'+this.$route.params.key" class="md-button md-button md-list-item-container md-theme-default">
						<div class="md-list-item-holder"><i class="md-icon material-icons md-theme-default">people</i> <span>Population</span></div>
					</router-link>
				</li>

				<li v-show="this.$route.params.key" @click="$refs.sidebar.toggle()" class="md-list-item">
					<router-link :to="'/settlement/party/'+this.$route.params.key" class="md-button md-button md-list-item-container md-theme-default">
						<div class="md-list-item-holder"><i class="md-icon icon users md-theme-default"></i> <span>Party</span></div>
					</router-link>
				</li>

				<div class="ui divider"></div>

				<li v-show="auth.login" @click="$refs.sidebar.toggle()" class="md-list-item">
					<md-button class="md-button md-list-item-container md-theme-default" v-on:click.prevent="logout" style="width:100%">
						<div class="md-list-item-holder"><i class="md-icon material-icons md-theme-default">exit_to_app</i> <span>Log Out</span></div>
					</md-button>
				</li>

			</md-list>
		</md-sidenav>

		<md-whiteframe md-elevation="10">
			<md-toolbar class="md-dense">

				<div class="md-toolbar-container">

					<md-button v-if="auth.name" class="md-icon-button" @click="$refs.sidebar.toggle()">
						<md-icon>menu</md-icon>
					</md-button>

					<h2 class="md-title" style="flex: 1">KD: M</h2>
				</div>

			</md-toolbar>
		</md-whiteframe>
	</div>
	<!-- <div class="ui borderless fluid small inverted menu" style="background-color: #333;"> -->
	<!-- <div class="ui large top fixed menu"> -->
		<!-- <a class="toc item"><i class="sidebar icon" style="margin-right:0;"></i></a> -->
		<!-- <a href="/settlement" class="item head"></a> -->
		<!-- <div v-if="auth.avatar != null" class="right menu"> -->
			<!-- <div class="ui inline icon dropdown item"> -->
				<!-- <img class="ui mini circular image active" v-bind:src="auth.avatar"> -->
				<!-- <div class="menu"> -->
					<!-- <a v-on:click.prevent="logout" class="item"><i class="black sign out icon"></i><b>Log Out</b></a> -->
				<!-- </div> -->
			<!-- </div> -->
		<!-- </div> -->
	<!-- </div> -->

</template>

<script>

	import { mapState } from 'vuex'

	export default {

		computed: {
			...mapState(['auth', 'settlement'])
		},

		mounted () {

			$('.ui.inline.dropdown.item').dropdown();

		},

		methods: {

			logout () {

				this.$store.dispatch('authLogout').then(this.$router.push('home'))
			}
		}
	}

</script>
