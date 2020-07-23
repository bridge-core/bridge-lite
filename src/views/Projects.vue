<template>
	<div>
		<ActionInput v-model="projectName" @action="onCreateProject">
			Create Project
		</ActionInput>
	</div>

	<ul>
		<li
			v-for="(folderHandle, i) in projects"
			:key="i"
			class="cursor-pointer"
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
import { forEach } from '../io/iterateFolder'
import { createProject } from '../projects/create'
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
export const onCreateProject = async () => {
	createProject(projects, projectName.value)
	projectName.value = null
}

export default {
	components: {
		ActionInput,
	},
}
</script>
