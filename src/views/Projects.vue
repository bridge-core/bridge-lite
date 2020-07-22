<template>
	<div>
		<ActionInput v-model="projectName" @action="createProject">
			Create Project
		</ActionInput>
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
import ActionInput from '../components/Common/ActionInput.vue'

export const projects = ref([])
watch(
	bridgeFolder,
	async () => {
		projectsFolder.value = await bridgeFolder.value.getDirectory(
			'projects',
			{
				create: true,
			}
		)
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
	let i = 0
	let createProject = true
	while (i < projects.value.length) {
		if (
			projects.value[i].name.toLowerCase() ===
			projectName.value.toLowerCase()
		) {
			createProject = false //Folder already exists
		} else if (
			projects.value[i].name.localeCompare(projectName.value) >= 0
		) {
			break
		}

		i++
	}

	if (createProject) {
		const handle = await projectsFolder.value.getDirectory(
			projectName.value,
			{
				create: true,
			}
		)
		projects.value.splice(i, 0, handle)
	}
	projectName.value = null
}

export default {
	components: {
		ActionInput,
	},
}
</script>
