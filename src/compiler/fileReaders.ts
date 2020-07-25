import {
	readJsonFile,
	readFileRaw,
	readFile,
	writeFile,
	writeJsonFile,
} from '../io/main'

export const txtFiles = ['.js', '.txt', '.lang']
export function getFileData(fileHandle: TFileHandle) {
	const extension = `.${fileHandle.name.split('.').pop()}`
	if (extension === '.json') return readJsonFile(fileHandle)
	if (txtFiles.includes(extension)) return readFile(fileHandle)

	return readFileRaw(fileHandle)
}

export function writeFileData(fileHandle: TFileHandle, fileContent: unknown) {
	const extension = `.${fileHandle.name.split('.').pop()}`
	if (extension === '.json') return writeJsonFile(fileHandle, fileContent)

	return writeFile(fileHandle, <string>fileContent)
}
