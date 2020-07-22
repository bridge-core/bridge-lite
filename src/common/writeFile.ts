export async function writeFile(fileHandle: TDirectoryHandle, data: string) {
	const writable = await fileHandle.createWritable()
	await writable.write(data)
	await writable.close()
}

export async function writeJsonFile(fileHandle: TDirectoryHandle, data: any) {
	writeFile(fileHandle, JSON.stringify(data, null, '\t'))
}
