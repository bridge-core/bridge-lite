<template>
	<div
		ref="monacoContainer"
		:style="`height: ${windowHeight}px; width: ${
			windowWidth - sidebarWidth
		}px;`"
	/>
</template>

<script>
import { v4 as uuid } from 'uuid'
import {
	ref,
	defineComponent,
	onMounted,
	watch,
	onDeactivated,
	nextTick,
} from 'vue'
import * as monaco from 'monaco-editor'
import { file, filePath } from './state'
import { useWindowSize } from '@vueuse/core'
import { useSidebarSize } from '../../composables/useSidebarSize'

self.MonacoEnvironment = {
	getWorkerUrl: function (moduleId, label) {
		if (label === 'json') {
			return './json.worker.js'
		}
		if (label === 'css') {
			return './css.worker.js'
		}
		if (label === 'html') {
			return './html.worker.js'
		}
		if (label === 'typescript' || label === 'javascript') {
			return './ts.worker.js'
		}
		return './editor.worker.js'
	},
}

export default defineComponent({
	setup(props) {
		const { width: windowWidth, height: windowHeight } = useWindowSize()
		const { width: sidebarWidth } = useSidebarSize()
		const monacoContainer = ref(null)
		let URI = ''
		let monacoEditor = undefined
		let currentModel = undefined

		watch(file, () => {
			if (monaco.editor.getModel(URI))
				monaco.editor.getModel(URI).dispose()
			URI = monaco.Uri.file(filePath.value)

			if (monacoEditor)
				monacoEditor.setModel(
					monaco.editor.createModel(file.value, 'json', URI)
				)
		})

		onMounted(() => {
			monacoEditor = monaco.editor.create(monacoContainer.value, {
				roundedSelection: false,
				autoIndent: 'full',
			})
			monacoEditor.layout()
		})

		watch([windowHeight, windowWidth, sidebarWidth], () => {
			if (monacoEditor) monacoEditor.layout()
		})

		return {
			file,
			windowHeight,
			windowWidth,
			sidebarWidth,
			monacoContainer,
		}
	},
})
</script>
