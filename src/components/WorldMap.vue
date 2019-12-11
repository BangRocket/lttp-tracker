<template>
	<easel-canvas
		width="800"
		height="800"
	>
		<easel-bitmap
			image="../assets/map/WorldMap-LightWorld.png"
			:x="0"
			:y="0"
			:align="['left','top']"
			:scale="0.2"
		>
		</easel-bitmap>
	</easel-canvas>
</template>

<script>

export default {
	name: 'WorldMap',
	props: {
		id: {
			type: [String],
			default: 'worldmap'
		}
	},
	data () {
		return {

		}
	},
	computed: {
		// iconUrl () {
		// return require('./assets/img.png')
		// The path could be '../assets/img.png', etc., which depends on where your vue file is
		// }
	},
	created () {
	},
	methods: {
		test: () => {

		}
	}
}
</script>

<style scoped>

</style>
