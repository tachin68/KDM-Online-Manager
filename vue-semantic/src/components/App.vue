<template>

	<div>

		<nav-layout></nav-layout>

		<main-layout></main-layout>

		<!-- <foot-layout></foot-layout> -->

	</div>

</template>

<script>

	import { mapState } from 'vuex'
	import NavLayout from './layout/nav'
	import MainLayout from './layout/main'
	// import FootLayout from './layout/footer'

	export default {

		computed: mapState(['auth']),
		// components: {NavLayout, MainLayout, FootLayout},
		components: {NavLayout, MainLayout},
	}

</script>