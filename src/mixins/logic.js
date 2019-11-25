import { mapState } from 'vuex'

export var logic = {
	name: 'logic',
	data () {
		return {
			glitchless: 'unavailable',
			owGlitches: 'unavailable',
			majorGlitches: 'unavailable',
			inverted: 'unavailable'
		}
	},
	methods: {
		canLiftRocks () {
			return this.trackerData.items.items.glove >= 1
		}
	},
	computed: {
		getClassName () {
			return this.trackerOptions.mapLogic
		},
		...mapState(['trackerData', 'trackerOptions', 'isRoomLoaded'])
	},
	watch: {
		glitchless: function (newVal) {
			this.owGlitches = newVal
			this.majorGlitches = newVal
		},
		owGlitches: function (newVal) {
			this.majorGlitches = newVal
		}
	}
}
