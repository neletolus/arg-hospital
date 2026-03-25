import { watch, onMounted } from 'vue'
import { useHorrorStore } from '@/stores/horror'

export function useHorrorProgression() {
  const horror = useHorrorStore()

  function applyHorrorLevel(level: number) {
    const root = document.documentElement

    // Reset
    root.classList.remove(
      'horror-level-1',
      'horror-level-2',
      'horror-level-3',
      'horror-level-4',
      'horror-level-5',
    )

    if (level >= 1) {
      root.classList.add('horror-level-1')
    }
    if (level >= 2) {
      root.classList.add('horror-level-2')
      root.style.setProperty('--color-background', '#f6f4f0')
    }
    if (level >= 3) {
      root.classList.add('horror-level-3')
      root.style.setProperty('--color-primary', '#4a7a9b')
    }
    if (level >= 4) {
      root.classList.add('horror-level-4')
      root.style.setProperty('--color-background', '#f0ece4')
      root.style.setProperty('--color-primary', '#5a6a7a')
    }
    if (level >= 5) {
      root.classList.add('horror-level-5')
      root.style.setProperty('--color-background', '#e8e0d4')
      root.style.setProperty('--color-primary', '#6a5a5a')
    }
  }

  onMounted(() => {
    applyHorrorLevel(horror.horrorLevel)
  })

  watch(
    () => horror.horrorLevel,
    (level) => {
      applyHorrorLevel(level)
    },
  )

  return { horrorLevel: horror.horrorLevel }
}
