<template>
	<input
		:value="modelValue"
		@input="$emit('update:modelValue', $event.target.value)"
		@keydown.enter="$emit('action')"
	/>
	<button @click="$emit('action')" :disabled="disabled">
		<slot />
	</button>
</template>

<script>
export default {
	name: 'ActionInput',
	emits: ['action', 'update:modelValue'],
	props: {
		disabled: Boolean,
		modelValue: String,
	},
}
</script>
