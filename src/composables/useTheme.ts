import { Ref, computed } from 'vue'
import { useDarkMode } from './useDarkMode'

export function useTheme(isDarkMode: Ref<boolean>) {
	return {
		textColor: computed(() => (isDarkMode.value ? '#efefef' : '#24292e')),
		sidebarColor: computed(() => (isDarkMode.value ? '#1f1f1f' : '#fff')),
		mainBackground: computed(() =>
			isDarkMode.value ? '#121212' : '#f6f8fa'
		),

		inputColor: computed(() => (isDarkMode.value ? '#24292e' : '#efefef')),
		buttonColor: computed(() => (isDarkMode.value ? '#24292e' : '#efefef')),
		hoverButtonColor: computed(() =>
			isDarkMode.value ? '#565656' : 'white'
		),
	}
}
