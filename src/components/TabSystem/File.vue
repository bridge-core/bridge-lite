<template>
	<div
		ref="monacoContainer"
		:style="`height: ${windowHeight - appBarHeight}px; width: ${
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
import { compile } from '../../compiler/compile'
import { useDarkMode } from '../../composables/useDarkMode'
import { useAppBarSize } from '../../composables/useAppBarSize'

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
		const { isDarkMode } = useDarkMode()
		const { width: windowWidth, height: windowHeight } = useWindowSize()
		const { width: sidebarWidth } = useSidebarSize()
		const { height: appBarHeight } = useAppBarSize()
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
					monaco.editor.getModel(URI) ||
						monaco.editor.createModel(file.value, null, URI)
				)
		})

		onMounted(() => {
			monacoEditor = monaco.editor.create(monacoContainer.value, {
				roundedSelection: false,
				autoIndent: 'full',
				theme: isDarkMode.value ? 'vs-dark' : 'vs-light',
			})
			monacoEditor.layout()
		})

		watch([windowHeight, windowWidth, sidebarWidth], () => {
			if (monacoEditor) monacoEditor.layout()
		})

		watch(isDarkMode, (value) => {
			monaco.editor.setTheme(value ? 'vs-dark' : 'vs-light')
		})

		return {
			file,
			windowHeight,
			windowWidth,
			appBarHeight,
			sidebarWidth,
			monacoContainer,
		}
	},
})
</script>
