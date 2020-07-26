import { ICompilerData } from './compile'
import { ref, Ref } from 'vue'
import { getFileData } from './fileReaders'

export interface IProcessor {
	matches: (fileHandle: TFileHandle) => Promise<boolean> | boolean
	process: (fileContent: Ref<unknown>) => Promise<void> | void
}

const processorMap = new Map<string, IProcessor[]>()

export async function processFile({ fileHandle, packType }: ICompilerData) {
	const processors = processorMap.get(packType) ?? []
	const fileContent = ref(await getFileData(fileHandle))

	for (let processor of processors) {
		if (processor.matches(fileHandle)) await processor.process(fileContent)
	}

	return fileContent.value
}

export function addProcessor(packType: string, processor: IProcessor) {
	if (processorMap.has(packType)) processorMap.get(packType)?.push(processor)
	else processorMap.set(packType, [processor])
}
