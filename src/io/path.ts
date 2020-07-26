export function getPath(baseDirectory: TDirectoryHandle, handle: THandle) {
	return baseDirectory.resolve(handle)
}
export function getStrPath(baseDirectory: TDirectoryHandle, handle: THandle) {
	return baseDirectory
		.resolve(handle)
		.then((folders: string[]) => folders.join('/'))
}

export async function getDirectory(
	baseDirectory: TDirectoryHandle,
	folderPath: string[],
	create = false
) {
	let current = baseDirectory

	for (let folder of folderPath) {
		current = await current.getDirectory(folder, { create })
	}

	return current
}

export async function getFile(
	baseDirectory: TDirectoryHandle,
	folderPath: string[],
	create = false
) {
	let file = folderPath.pop()
	let folder = await getDirectory(baseDirectory, folderPath, create)

	return await folder.getFile(file, { create })
}
