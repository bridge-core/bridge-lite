<template>
	<img
		@click="$emit('click')"
		src="../../assets/logo.png"
		height="22"
		style="margin: 1px 0px;"
		class="cursor-pointer"
	/>
	<span @click="$emit('click')" class="cursor-pointer">bridge.</span>
</template>

<script>
export default {
	name: 'HomeTile',
	emits: ['click'],
}
</script>

<style scoped>
.cursor-pointer {
	cursor: pointer;
}
</style>
