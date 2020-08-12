import { ref, Ref } from 'vue'

/**
 * The base folder that contains all application data
 */
export const bridgeFolder: Ref<null | TDirectoryHandle> = ref(null)
/**
 * The folder that contains all user projects
 */
export const projectsFolder: Ref<null | TDirectoryHandle> = ref(null)
/**
 * The currently selected project
 */
export const currentProjectFolder: Ref<null | TDirectoryHandle> = ref(null)
