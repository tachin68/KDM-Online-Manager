<template>

	<!-- <div class="pusher" style="background:#f9f9f9;"> -->
	<!-- <div class="pusher" style="background:#0d0d0d;"> -->
	<div class="pusher">

        <div class="full height">
			<router-view id="main-content" class="main-content"></router-view>
        </div>

    </div>
    <!-- pusher -->

</template>

<script>
	export default {

	}
</script>

<style>
/* Mobile */
@media only screen and (max-width: 480px) {

    .pusher {
	    padding-top:3rem;
	}
}

/* Phablet */
@media only screen and (min-width: 481px) and (max-width: 767px) {

    .pusher {
	    padding-top:3rem;
	}
}

/* Tablet / iPad Portrait */
@media only screen and (min-width: 768px) and (max-width: 991px) {

    .pusher {
	    padding-top:3rem;
	}
}

/* Computer / Desktop / iPad Landscape */
@media only screen and (min-width: 992px) and (max-width: 1199px) {

    .pusher {
	    padding-top:3rem;
	}
}

/* Large Monitor */
@media only screen and (min-width: 1200px) and (max-width: 1919px) {

	.pusher {
	    padding-top:3rem;
	}
}

/* Widescreen Monitor */
@media only screen and (min-width: 1920px) {

    .pusher {
	    padding-top:3rem;
	}
}
</style>