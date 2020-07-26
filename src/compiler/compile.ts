import { usedByMap } from './usedByMap'
import { processFile, addProcessor } from './fileProcessors'
import { transformPath, addTransformer } from './pathTransformers'
import { writeFileData } from './fsWrapper'
import { getFile } from '../io/path'
import { Ref } from 'vue'

export interface ICompilerData {
	fileHandle: TFileHandle
	packType: string
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
/**
 * Just a test environment for messing around with the compiler
 */
//@ts-ignore
window.getFile = getFile
//@ts-ignore
window.compile = compile

addProcessor('BP', {
	matches: () => true,
	process: (fileContent: Ref<unknown>) => {
		fileContent.value = {
			'@meta': {
				createdWith: 'bridge.',
				comment: 'I am the first file bridge.-lite compiled!',
			},
			...(<Object>fileContent.value),
		}
	},
})
addTransformer('BP', {
	matches: () => true,
	transform: (filePath: string[]) => {
		const basePath = filePath.slice(0, filePath.length - 1)
		return [
			...basePath,
			filePath[filePath.length - 1].replace('.json', ''),
			'main.json',
		]
	},
})
