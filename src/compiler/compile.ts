import { usedByMap } from './usedByMap'
import { processFile } from './processors'
import { transformPath } from './pathTransformers'
import { writeFileData } from './fileReaders'
import { getFile } from '../io/path'

export interface ICompilerData {
	fileHandle: TFileHandle
	packType: string
	packName: string
	buildName: string
}

export async function compile(compilerData: ICompilerData) {
	const { fileHandle } = compilerData
	const usedBy: TFileHandle[] = usedByMap.get(fileHandle) ?? []
	const [fileContent, buildDirectory] = await Promise.all([
		processFile(compilerData),
		transformPath(compilerData),
	])

	await writeFileData(buildDirectory, fileContent)
}
