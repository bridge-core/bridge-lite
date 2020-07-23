export async function forEach(
	directoryHandle: TDirectoryHandle,
	cb: (handle: THandle) => void
) {
	for await (const handle of directoryHandle.getEntries()) {
		cb(handle)
	}
}
export async function recursiveForEach(
	directoryHandle: TDirectoryHandle,
	cb: (handle: THandle) => void
) {
	const promises: Promise<unknown>[] = []

	for await (const handle of directoryHandle.getEntries()) {
		if (handle.isFile) cb(handle)
		else promises.push(recursiveForEach(handle, cb))
	}

	await Promise.all(promises)
}
