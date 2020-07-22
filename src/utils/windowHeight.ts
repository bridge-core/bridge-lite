import { ref } from "vue"

export const windowHeight = ref(window.innerHeight)

window.addEventListener("resize", () => {
    windowHeight.value = window.innerHeight
    console.log(windowHeight)
})