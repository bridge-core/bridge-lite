<template>
	<button class="tile-button" @click="onClick">
		<slot />
	</button>
</template>

<script lang="ts" setup="props, { emit }">
import { Ref, computed, ref } from 'vue'
import { useTheme } from '../../composables/useTheme'
import { useDarkMode } from '../../composables/useDarkMode'

declare function emit(event: 'click'): void
declare const props: {
	isDarkMode?: boolean
	isDisabled?: boolean
}

export const { isDarkMode: globalIsDarkMode } = useDarkMode()
export const { textColor, buttonColor, hoverButtonColor } = useTheme(
	props.isDarkMode ? ref(props.isDarkMode) : globalIsDarkMode
)
export const onClick = () => {
	emit('click')
}
</script>

<style vars="{ buttonColor, textColor, hoverButtonColor }">
.tile-button {
	border: none;
	display: inline-block;
	height: 24px;
	color: var(--textColor);
	background-color: var(--buttonColor);
}

.tile-button:hover {
	background-color: var(--hoverButtonColor);
}
</style>
