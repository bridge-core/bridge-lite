import { usedByMap } from './usedByMap'
import { processFile, addProcessor } from './fileProcessors'
import { transformPath, addTransformer } from './pathTransformers'
import { writeFileData } from './fileReaders'
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
			'Test Compile': 'I am the first file bridge.-lite compiled!',
		}
	},
})
addTransformer('BP', {
	matches: () => true,
	transform: (filePath: string[]) => {
		const basePath = filePath.slice(0, filePath.length - 2)
		return [...basePath, 'manifests', 'main.json']
	},
})
