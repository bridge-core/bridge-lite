<template>
	<div class="ide-view">
		<FSMain />
		<File />
	</div>
</template>

<script>
import FSMain from '../components/FS/Main.vue'
import File from '../components/TabSystem/File.vue'
import { useSidebarSize } from '../composables/useSidebarSize'
import { computed } from 'vue'

export default {
	name: 'IDE',
	components: {
		FSMain,
		File,
	},
	setup() {
		const {
			minWidth: rawMinWidth,
			maxWidth: rawMaxWidth,
		} = useSidebarSize()

		return {
			minWidth: `${rawMinWidth}px`,
			maxWidth: `${rawMaxWidth * 100}%`,
		}
	},
}
</script>

<style scoped vars="{ minWidth, maxWidth }">
.ide-view {
	display: grid;
	width: 100%;
	grid-template-columns: minmax(var(--minWidth), var(--maxWidth)) 1fr 1fr;
}
</style>
