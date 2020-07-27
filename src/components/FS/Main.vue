<template>
	<span :style="`height: ${windowHeight}px; overflow: auto;`">
		<TileButton @click="toggleDarkMode">DarkMode</TileButton>
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
import TileButton from '../Common/TileButton.vue'
import { useWindowSize } from '@vueuse/core'
import { packs } from '../../projects/loadPacks'
import { useDarkMode } from '../../composables/useDarkMode'

declare const chooseFileSystemEntries: (...args: unknown[]) => any

export default defineComponent({
	components: {
		Folder,
		TileButton,
	},
	setup(props) {
		onErrorCaptured(console.error)
		const { toggleDarkMode } = useDarkMode()
		const { height: windowHeight } = useWindowSize()

		return {
			toggleDarkMode,
			windowHeight,
			packs,
		}
	},
})
</script>
