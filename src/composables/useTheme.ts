import { Ref, computed } from 'vue'
import { useDarkMode } from './useDarkMode'

export function useTheme(isDarkMode: Ref<boolean>) {
	return {
		textColor: computed(() => (isDarkMode.value ? '#efefef' : '#24292e')),
		sidebarColor: computed(() => (isDarkMode.value ? '#24292e' : '#fff')),
		mainBackground: computed(() =>
			isDarkMode.value ? '#24292e' : '#f6f8fa'
		),

		inputColor: computed(() => (isDarkMode.value ? '#24292e' : '#efefef')),
		buttonColor: computed(() => (isDarkMode.value ? '#24292e' : '#efefef')),
		hoverButtonColor: computed(() =>
			isDarkMode.value ? '#565656' : 'white'
		),
	}
}
