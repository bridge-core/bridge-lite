import { ICompilerData } from './compile'
import { currentProjectFolder } from '../common/ENV'

export interface ITransformer {
	matches: (fileHandle: TFileHandle) => Promise<boolean>
	transform: (fileHandle: TFileHandle) => Promise<void>
}

const pathTransformerMap = new Map<string, ITransformer[]>()

export async function transformPath({
	fileHandle,
	packType,
	packName,
	buildName,
}: ICompilerData) {
	const transformers = pathTransformerMap.get(packType) ?? []
	const buildDir = await (
		await (
			await currentProjectFolder.value.getDirectory('builds')
		).getDirectory(buildName)
	).getDirectory('packs', { create: true })

	for (let transformer of transformers) {
		if (await transformer.matches(fileHandle))
			return await transformer.transform(buildDir)
	}

	return buildDir.getDirectory(packName)
}

export function addTransformor(packType: string, transformer: ITransformer) {
	if (pathTransformerMap.has(packType))
		pathTransformerMap.get(packType)?.push(transformer)
	else pathTransformerMap.set(packType, [transformer])
}
