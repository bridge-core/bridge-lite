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
import { windowHeight } from '../../common/windowHeight'
import Folder from './Folder.vue'
import { currentProjectFolder } from '../../common/ENV'

declare const chooseFileSystemEntries: (...args: unknown[]) => any

export default defineComponent({
	components: {
		Folder,
	},
	setup(props) {
		onErrorCaptured(console.error)

		return {
			currentProjectFolder,
			windowHeight,
		}
	},
})
</script>
