<template>
	<Suspense>
		<Folder
			:style="`height: ${windowHeight}px; overflow: auto;`"
			:directoryHandle="currentProjectFolder"
		/>
	</Suspense>
</template>

<script lang="ts">
import { ref, onErrorCaptured, defineComponent } from 'vue'
import Folder from './Folder.vue'
import { currentProjectFolder } from '../../common/ENV'
import { useWindowSize } from '@vueuse/core'

declare const chooseFileSystemEntries: (...args: unknown[]) => any

export default defineComponent({
	components: {
		Folder,
	},
	setup(props) {
		onErrorCaptured(console.error)
		const { height: windowHeight } = useWindowSize()

		return {
			currentProjectFolder,
			windowHeight,
		}
	},
})
</script>
