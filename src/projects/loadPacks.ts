import { forEach } from '../io/iterateFolder'
import { readJsonFile } from '../io/main'
import { ref } from 'vue'

const packTypes = <const>['data', 'resources', 'skin_pack']
interface IPack {
	type: typeof packTypes[number]
	directoryHandle: TDirectoryHandle
}

export const packs = ref<IPack[]>([])
export async function loadPacks(packsHandle: TDirectoryHandle) {
	await forEach(packsHandle, async (packHandle) => {
		const manifestFile = await packHandle.getFile('manifest.json')
		const manifestData: any = await readJsonFile(manifestFile)

		for (let module of manifestData?.modules ?? []) {
			if (!packTypes.includes(module?.type)) continue

			packs.value.push({
				type: module?.type,
				directoryHandle: packHandle,
			})
		}
	})
}
