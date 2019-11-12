<template>
	<div>
		<div
			class="vueTrackerTable"
			:style="{}"
		>
			<div
				v-for="(itemRow, itemRowIndex) in itemRows"
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
					:tracker-data="trackerData"
					:tracker-options="trackerOptions"
				></tracker-cell>
				<button
					v-if="trackerOptions && trackerOptions.editmode"
					:style="{backgroundColor: 'red', color: 'white', verticalAlign: 'top', marginTop: '20px'}"
					@click.prevent.stop="removeItem(itemRowIndex)"
				>
					-
				</button>
				<button
					v-if="trackerOptions && trackerOptions.editmode"
					:style="{backgroundColor: 'green', color: 'white', verticalAlign: 'top', marginTop: '20px'}"
					@click.prevent.stop="addItem(itemRowIndex)"
				>
					+
				</button>
			</div>
			<button
				v-if="trackerOptions && trackerOptions.editmode"
				@click.prevent.stop="addRow"
			>
				Add row
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'TrackerTable',
	props: ['itemRows', 'trackerData', 'trackerOptions'],
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
		}
	},
	methods: {
		itemFor: function (itemName) {
			if (!this.trackerData || !this.trackerData.items) return null
			return this.trackerData.items[itemName]
		},
		addRow: function (e) {
			// vm.itemRows.push(["blank"]);
		},
		addItem: function (rowIndex) {
			// vm.itemRows[rowIndex].push("blank");
		},
		removeItem: function (rowIndex) {
			// vm.itemRows[rowIndex].pop();
			// if (vm.itemRows[rowIndex].length === 0) {
			// vm.itemRows.splice(rowIndex, 1);
			// }
		}
	}
}
</script>
