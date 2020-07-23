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
		const { minSize: rawMinSize, maxSize: rawMaxSize } = useSidebarSize()

		return {
			minSize: `${rawMinSize}px`,
			maxSize: `${rawMaxSize * 100}%`,
		}
	},
}
</script>

<style scoped vars="{ minSize, maxSize }">
.ide-view {
	display: grid;
	width: 100%;
	grid-template-columns: minmax(var(--minSize), var(--maxSize)) 1fr 1fr;
}
</style>
