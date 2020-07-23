<template>
	<details class="indented-folder cursor-pointer">
		<summary>
			{{ directoryHandle.name }}
		</summary>
		<Folder
			v-for="(handle, i) in folders"
			:key="`${handle.name}-${i}`"
			:directoryHandle="handle"
		/>

		<div
			v-for="(handle, i) in files"
			:key="`${handle.name}-${i}`"
			@click="openFile(handle)"
			class="indented-folder cursor-pointer"
		>
			{{ handle.name }}
		</div>
	</details>
</template>

<script>
import { ref, defineComponent } from 'vue'
import { file, filePath } from '../TabSystem/state'
import { readFile } from '../../io/main'
import { getPath } from '../../io/getPath'

export default defineComponent({
	name: 'Folder',
	props: {
		directoryHandle: FileSystemDirectoryHandle,
	},
	async setup(props) {
		const folders = ref([])
		const files = ref([])
		const openFile = async (handle) => {
			filePath.value = await getPath(handle)
			file.value = await readFile(handle)
		}

		for await (const handle of props.directoryHandle.getEntries()) {
			if (handle.isFile) files.value.push(handle)
			else folders.value.push(handle)
		}

		return {
			folders,
			files,
			openFile,
		}
	},
})
</script>

<style scoped>
.indented-folder {
	margin-left: 12px;
}
</style>
