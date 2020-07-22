<template>
	<div>
		<input v-model="projectName" @keydown.enter="createProject" />
		<button @click="createProject" :disabled="projectName === null">
			Create
		</button>
	</div>

	<ul>
		<li
			v-for="(folderHandle, i) in projects"
			:key="i"
			@click="selectProject(folderHandle)"
		>
			{{ folderHandle.name }}
		</li>
	</ul>
</template>

<script setup>
import { ref, watch } from 'vue'
import {
	bridgeFolder,
	projectsFolder,
	currentProjectFolder,
} from '../common/ENV'
import { forEach } from '../common/iterateFolder'
import { router } from '../router'

export const projects = ref([])
watch(
	bridgeFolder,
	async () => {
		projectsFolder.value = await bridgeFolder.value
			.getDirectory('projects', {
				create: true,
			})
			.catch(console.error)
	},
	{ immediate: true }
)
watch(projectsFolder, () => {
	forEach(projectsFolder.value, (folderHandle) => {
		projects.value.push(folderHandle)
	})
})

export const projectName = ref(null)
export const selectProject = (handle) => {
	currentProjectFolder.value = handle
	router.push('/ide')
}
export const createProject = async () => {
	const handle = await projectsFolder.value.getDirectory(projectName.value, {
		create: true,
	})
	projects.value.push(handle)
	projects.value.sort(({ name: nameA }, { name: nameB }) =>
		nameA.localeCompare(nameB)
	)
	projectName.value = null
}
</script>
