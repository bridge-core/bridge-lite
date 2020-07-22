import { Ref } from 'vue'
import { projectsFolder } from '../common/ENV'
import { writeJsonFile } from '../common/writeFile'

export async function createProject(
	projects: Ref<THandle[]>,
	projectName: string
) {
	let i = 0
	while (i < projects.value.length) {
		if (
			projects.value[i].name.toLowerCase() === projectName.toLowerCase()
		) {
			return //Folder already exists
		} else if (projects.value[i].name.localeCompare(projectName) >= 0) {
			break
		}

		i++
	}

	const handle = await (<any>projectsFolder).value.getDirectory(projectName, {
		create: true,
	})
	projects.value.splice(i, 0, handle)

	const configFile = await handle.getFile('config.json', { create: true })
	writeJsonFile(configFile, {
		name: projectName,
		targets: {
			dev: 'default',
			publish: ['default', 'anyLanguage'],
		},
	})
}
