<template>
	<FSMain />
	<File />
</template>

<script>
import FSMain from './FS/Main.vue'
import File from './TabSystem/File.vue'

export default {
	name: 'IDE',
	components: {
		FSMain,
		File,
	},
}
</script>
