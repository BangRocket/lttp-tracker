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
					:tracker-data="records.trackerData"
					:tracker-options="records.trackerOptions"
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

export default {
	name: 'ItemTable',
	components: [ItemCell],
	data () {
		return {
			records: store.state
		}
	},
	computed: {
		maxRowLength: function () {
			return !store.itemRows.reduce
				? 0
				: store.itemRows
					.map(function (i) {
						return i.length
					})
					.reduce(function (a, b) {
						return Math.max(a, b)
					})
		}
	},
	methods: {
		itemFor: function (itemName) {
			if (store.state.trackerData || !store.state.trackerData.items) return null
			return store.state.trackerData.items[itemName]
		},
		addRow: function (e) {
			store.state.itemRows.push(['blank'])
		},
		addItem: function (rowIndex) {
			store.state.itemRows[rowIndex].push('blank')
		},
		removeItem: function (rowIndex) {
			store.state.itemRows[rowIndex].pop()
			if (store.state.itemRows[rowIndex].length === 0) {
				store.state.temRows.splice(rowIndex, 1)
			}
		}
	}
}
</script>
