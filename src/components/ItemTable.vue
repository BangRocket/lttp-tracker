<template>
	<div>
		<div
			class="vueTrackerTable"
			:style="{}"
		>
			<div
				v-for="(itemRow, itemRowIndex) in records.itemRows"
				:key="itemRowIndex"
			>
				<div
					:style="{ width: (maxRowLength - itemRow.length) * 32 + 'px', display:'inline-block' }"
					class="rowSpacer"
				></div>
				<ItemCell
					v-for="(item, itemColumnIndex) in itemRow"
					:key="itemColumnIndex + '-' + itemRowIndex"
					:item-name="item"
					:item-value="itemFor(item)"
					:column-index="itemColumnIndex"
					:row-index="itemRowIndex"
				></ItemCell>
				<button
					v-if="records.trackerOptions && records.trackerOptions.editmode"
					:style="{backgroundColor: 'red', color: 'white', verticalAlign: 'top', marginTop: '20px'}"
					@click.prevent.stop="removeItem(itemRowIndex)"
				>
					-
				</button>
				<button
					v-if="records.trackerOptions && records.trackerOptions.editmode"
					:style="{backgroundColor: 'green', color: 'white', verticalAlign: 'top', marginTop: '20px'}"
					@click.prevent.stop="addItem(itemRowIndex)"
				>
					+
				</button>
			</div>
			<button
				v-if="records.trackerOptions && records.trackerOptions.editmode"
				@click.prevent.stop="addRow"
			>
				Add row
			</button>
		</div>
	</div>
</template>

<script>
import { store } from '../store/store.js'
import ItemCell from '../components/ItemCell.vue'
import { mapState } from 'vuex'

export default {
	name: 'ItemTable',
	components: { ItemCell },
	data () {
		return {
			records: store.state
		}
	},
	computed: {
		maxRowLength: function () {
			return !this.itemRows.reduce
				? 0
				: this.itemRows
					.map(function (i) {
						return i.length
					})
					.reduce(function (a, b) {
						return Math.max(a, b)
					})
		},
		...mapState(['trackerData', 'itemRows'])
	},
	methods: {
		itemFor: function (itemName) {
			if (!this.trackerData || !this.trackerData.items) {
				return null
			}
			return this.trackerData.items[itemName]
		},
		addRow: function (e) {
			this.itemRows.push(['blank'])
		},
		addItem: function (rowIndex) {
			this.itemRows[rowIndex].push('blank')
		},
		removeItem: function (rowIndex) {
			this.itemRows[rowIndex].pop()
			if (this.itemRows[rowIndex].length === 0) {
				this.itemRows.splice(rowIndex, 1)
			}
		}
	}
}
</script>

<style>
.true {
	opacity: 1;
}

.false {
	opacity: 0.25;
}
</style>
