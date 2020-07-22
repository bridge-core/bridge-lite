<template>
	<div id="ide-view">
		<FSMain />
		<File />
	</div>
</template>

<script>
import FSMain from '../components/FS/Main.vue'
import File from '../components/TabSystem/File.vue'

export default {
	name: 'IDE',
	components: {
		FSMain,
		File,
	},
}
</script>
