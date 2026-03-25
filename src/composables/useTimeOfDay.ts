import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useHorrorStore } from '@/stores/horror'

export function useTimeOfDay() {
  const isNightMode = ref(false)
  const horror = useHorrorStore()
  let intervalId: number | undefined

  function checkTime() {
    const hour = new Date().getHours()
    isNightMode.value = hour >= 0 && hour < 4
  }

  watch(isNightMode, (night) => {
    if (night) {
      horror.discoverSecret('night-mode')
    }
  })

  onMounted(() => {
    checkTime()
    intervalId = window.setInterval(checkTime, 60_000)
  })

  onUnmounted(() => {
    if (intervalId !== undefined) {
      window.clearInterval(intervalId)
    }
  })

  return { isNightMode }
}
