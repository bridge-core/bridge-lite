<template>
    <button v-if="!directoryHandle" @click="selectDirectory">Directory</button>
    <Suspense v-else>
        <Folder
            :style="`height: ${windowHeight}px; overflow: auto;`"
            :directoryHandle="directoryHandle"
        />
    </Suspense>
</template>

<script lang="ts">
import { ref, onErrorCaptured, defineComponent } from "vue"
import { windowHeight } from "../../utils/windowHeight"
import Folder from "./Folder.vue"
declare const chooseFileSystemEntries: (...args: unknown[]) => any

export default defineComponent({
    components: {
        Folder,
    },
    setup(props) {
        onErrorCaptured(console.error)

        const directoryHandle = ref(null)
        const selectDirectory = async () => {
            directoryHandle.value = (await chooseFileSystemEntries({ type: 'open-directory', writable: true, }))
        }


        return {
            directoryHandle,
            selectDirectory,
            windowHeight,
        }
    }
})
</script>
