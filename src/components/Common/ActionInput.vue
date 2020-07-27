<template>
	<TileInput
		:value="modelValue"
		@input="$emit('update:modelValue', $event.target.value)"
		@action="$emit('action')"
	/>
	<TileButton @click="$emit('action')" :isDisabled="isDisabled">
		<slot />
	</TileButton>
</template>

<script>
import TileButton from './TileButton.vue'
import TileInput from './TileInput.vue'

export default {
	name: 'ActionInput',
	emits: ['action', 'update:modelValue'],
	props: {
		isDisabled: Boolean,
		modelValue: String,
	},
	components: {
		TileButton,
		TileInput,
	},
}
</script>
