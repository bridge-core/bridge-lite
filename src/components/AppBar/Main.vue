<template>
	<div
		:style="{ width: `${width}px`, height: `${height - 1}px` }"
		class="app-bar"
	>
		<HomeTile @click="$router.push('/')" />
		<TileButton @click="toggleDarkMode">DarkMode</TileButton>
	</div>
</template>

<script lang="ts" setup>
import HomeTile from './HomeTile.vue'
import TileButton from '../Common/TileButton.vue'
import { useAppBarSize } from '../../composables/useAppBarSize'
import { useTheme } from '../../composables/useTheme'
import { useDarkMode } from '../../composables/useDarkMode'
import { computed } from 'vue'

export const { width, height } = useAppBarSize()
export const { isDarkMode, toggleDarkMode } = useDarkMode()
export const { textColor } = useTheme(isDarkMode)

export default {
	components: {
		HomeTile,
		TileButton,
	},
}
</script>

<style vars="{ textColor }">
.app-bar {
	border-bottom: 1px solid var(--textColor);
	display: inline-flex;
	align-items: center;
}
</style>
