import { ICompilerData } from './compile'
import { currentProjectFolder } from '../common/ENV'
import { getPath, getFile } from '../io/path'

export interface ITransformer {
	matches: (currentFilePath: string[]) => Promise<boolean> | boolean
	transform: (buildDir: string[]) => Promise<string[]> | string[]
}

const pathTransformerMap = new Map<string, ITransformer[]>()

export async function transformPath({
	fileHandle,
	packType,
	buildName,
}: ICompilerData) {
	const transformers = pathTransformerMap.get(packType) ?? []
	const currentFilePath = await getPath(
		currentProjectFolder.value,
		fileHandle
	)
	let compileFilePath = ['builds', buildName, ...currentFilePath]

	for (let transformer of transformers) {
		if (await transformer.matches(currentFilePath)) {
			compileFilePath = await transformer.transform(compileFilePath)
		}
	}

	return await getFile(currentProjectFolder.value, compileFilePath, true)
}

export function addTransformer(packType: string, transformer: ITransformer) {
	if (pathTransformerMap.has(packType))
		pathTransformerMap.get(packType)?.push(transformer)
	else pathTransformerMap.set(packType, [transformer])

	return {
		dispose: () => {
			//TODO
		},
	}
}
