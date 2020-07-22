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

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { file } from '../TabSystem/state'

export default defineComponent({
	name: 'Folder',
	props: {
		//@ts-ignore
		directoryHandle: FileSystemDirectoryHandle,
	},
	async setup(props) {
		const folders = ref([])
		const files = ref([])
		const openFile = async (handle: any) => {
			file.value = await (await handle.getFile()).text()
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
