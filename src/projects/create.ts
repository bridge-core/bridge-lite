import { Ref } from 'vue'
import { projectsFolder } from '../common/ENV'
import { writeJsonFile } from '../io/main'

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

	await Promise.all([
		handle
			.getFile('config.json', { create: true })
			.then((configFile: TFileHandle) =>
				writeJsonFile(configFile, {
					name: projectName,
					targets: {
						dev: 'default',
						publish: ['default', 'anyLanguage'],
					},
				})
			),
		handle.getDirectory('builds', { create: true }),
		handle.getDirectory('packs', { create: true }),
		handle.getDirectory('worlds', { create: true }),
		handle.getDirectory('marketing', { create: true }),
	])
}
