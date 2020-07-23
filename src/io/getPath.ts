import { bridgeFolder } from '../common/ENV'

export function getPath(handle: THandle) {
	return bridgeFolder.value
		?.resolve(handle)
		.then((path: string[]) => path.join('/'))
}
