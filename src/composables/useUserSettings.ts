import { bridgeFolder } from '../common/ENV'
import { readJsonFile, writeJsonFile } from '../io/main'
import { reactive } from 'vue'

export async function useUserSettings() {
	const settingsFile = bridgeFolder.value.getFile('settings.json', {
		create: true,
	})
	const settingsData = reactive(<object>await readJsonFile(settingsFile))

	return {
		getData: () => settingsData,
		save: () => writeJsonFile(settingsFile, settingsData),
	}
}
