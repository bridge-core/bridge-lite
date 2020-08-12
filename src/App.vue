<template>
	<div class="app-view">
		<AppBar />
		<router-view />
	</div>
</template>

<script lang="ts" setup>
import AppBar from './components/AppBar/Main.vue'
import { useTheme } from './composables/useTheme'
import { useDarkMode } from './composables/useDarkMode'
import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

const { height } = useWindowSize()
const { isDarkMode } = useDarkMode()

export const { mainBackground, textColor } = useTheme(isDarkMode)
export const windowHeight = computed(() => `${height.value}px`)
export default {
	name: 'App',
	components: {
		AppBar,
	},
}
</script>

<style vars="{ mainBackground, textColor, windowHeight }">
.app-view {
	background-color: var(--mainBackground);
	color: var(--textColor);
	height: var(--windowHeight);
}
</style>
