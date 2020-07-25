import { usedByMap } from './usedByMap'
import { processFile } from './processors'
import { transformPath } from './pathTransformers'

export interface ICompilerData {
	fileHandle: TFileHandle
	packType: string
	packName: string
	buildName: string
}

export async function compile(compilerData: ICompilerData) {
	const { fileHandle } = compilerData
	const usedBy: TFileHandle[] = usedByMap.get(fileHandle) ?? []
	const fileContent = await processFile(compilerData)
	const buildDirectory = await transformPath(compilerData)
}
