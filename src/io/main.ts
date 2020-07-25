export async function writeFile(fileHandle: TDirectoryHandle, data: string) {
	const writable = await fileHandle.createWritable()
	await writable.write(data)
	await writable.close()
}

export async function writeJsonFile(fileHandle: TDirectoryHandle, data: any) {
	writeFile(fileHandle, JSON.stringify(data, null, '\t'))
}

export async function readFileRaw(fileHandle: TFileHandle): Promise<Blob> {
	return await fileHandle.getFile()
}

export async function readFile(fileHandle: TFileHandle) {
	return await (await readFileRaw(fileHandle)).text()
}

export async function readJsonFile(fileHandle: TFileHandle): Promise<unknown> {
	return (await new Response(await readFileRaw(fileHandle))).json()
}
