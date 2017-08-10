<template>
	<div class="ui basic breadcrumb">
		<a class="section">Settlement</a>
		<i class="right angle icon divider"></i>
		<!-- <a class="section">Store</a> -->
		<!-- <i class="right angle icon divider"></i> -->
		<div class="active section">T-Shirt</div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				// link: window.location.href
			}
		},

		mounted () {

			console.log(window.location.href)
		},
	}
</script>