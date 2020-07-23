<template>
	<span :style="`height: ${windowHeight}px; overflow: auto;`">
		<div v-for="({ type, directoryHandle }, i) in packs" :key="i">
			<Suspense>
				<Folder :directoryHandle="directoryHandle" />
			</Suspense>
		</div>
	</span>
</template>

<script lang="ts">
import { ref, onErrorCaptured, defineComponent } from 'vue'
import Folder from './Folder.vue'
import { useWindowSize } from '@vueuse/core'
import { packs } from '../../projects/loadPacks'

declare const chooseFileSystemEntries: (...args: unknown[]) => any

export default defineComponent({
	components: {
		Folder,
	},
	setup(props) {
		onErrorCaptured(console.error)
		const { height: windowHeight } = useWindowSize()

		return {
			windowHeight,
			packs,
		}
	},
})
</script>
