<template>
	<div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export var Location = {
	name: 'Location',
	data () {
		return {
			name: '',
			x: '0%',
			y: '0%',
			isOpened: false
		}
	},
	methods: {
		isAvailable () {}
	},
	computed: {
		getClassName () {
			return this.trackerOptions.mapLogic
		},
		...mapState(['trackerData', 'trackerOptions'])
	}
}
</script>
