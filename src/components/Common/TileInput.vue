<template>
	<input
		class="tile-input"
		:value="modelValue"
		@input="onInput"
		@keydown.enter="$emit('action')"
	/>
</template>

<script lang="ts" setup="props, { emit }">
import { ref } from 'vue'
import { useTheme } from '../../composables/useTheme'
import { useDarkMode } from '../../composables/useDarkMode'

declare function emit(
	event: 'input' | 'update:modelValue',
	value?: unknown
): void
declare const props: {
	isDarkMode?: boolean
	modelValue?: string
}
export const { isDarkMode: globalIsDarkMode } = useDarkMode()
export const { textColor, inputColor } = useTheme(
	props.isDarkMode ? ref(props.isDarkMode) : globalIsDarkMode
)
export const onInput = (event: any) => {
	emit('input')
	emit('update:modelValue', event.target.value)
}

export default {
	emits: ['action', 'update:modelValue'],
}
</script>

<style vars="{ textColor, inputColor }">
.tile-input {
	background-color: var(--inputColor);
	border: none;
	border-bottom: 1px solid var(--textColor);
	color: var(--textColor);
}

.tile-input:focus {
	outline: none;
}
</style>
