import { ref, Ref } from 'vue'

export const bridgeFolder: Ref<null | TDirectoryHandle> = ref(null)
export const projectsFolder: Ref<null | TDirectoryHandle> = ref(null)
export const currentProjectFolder: Ref<null | TDirectoryHandle> = ref(null)
