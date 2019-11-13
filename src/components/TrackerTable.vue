<template>
	<div>
		<div
			class="vueTrackerTable"
			:style="{}"
		>
			<div
				v-for="(itemRow, itemRowIndex) in store.itemRows"
				:key="itemRowIndex"
			>
				<div
					:style="{ width: (maxRowLength - itemRow.length) * 32 + 'px', display:'inline-block' }"
					class="rowSpacer"
				></div>
				<tracker-cell
					v-for="(item, itemColumnIndex) in itemRow"
					:key="itemColumnIndex + '-' + itemRowIndex"
					:item-name="item"
					:item-value="itemFor(item)"
					:column-index="itemColumnIndex"
					:row-index="itemRowIndex"
					:tracker-data="store.trackerData"
					:tracker-options="store.trackerOptions"
				></tracker-cell>
				<button
					v-if="store.trackerOptions && store.trackerOptions.editmode"
					:style="{backgroundColor: 'red', color: 'white', verticalAlign: 'top', marginTop: '20px'}"
					@click.prevent.stop="removeItem(itemRowIndex)"
				>
					-
				</button>
				<button
					v-if="store.trackerOptions && store.trackerOptions.editmode"
					:style="{backgroundColor: 'green', color: 'white', verticalAlign: 'top', marginTop: '20px'}"
					@click.prevent.stop="addItem(itemRowIndex)"
				>
					+
				</button>
			</div>
			<button
				v-if="store.trackerOptions && store.trackerOptions.editmode"
				@click.prevent.stop="addRow"
			>
				Add row
			</button>
		</div>
	</div>
</template>

<script>
import { store } from '../store/store.js'

export default {
	name: 'TrackerTable',
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
