import { ref, readonly } from 'vue'

const isDarkMode = ref(false)
export function useDarkMode() {
	return {
		isDarkMode: readonly(isDarkMode),
		setDarkMode: (value: boolean) => (isDarkMode.value = value),
		toggleDarkMode: () => (isDarkMode.value = !isDarkMode.value),
	}
}
