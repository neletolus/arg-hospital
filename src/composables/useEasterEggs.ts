import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useHorrorStore } from '@/stores/horror'

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
] as const

export function useEasterEggs() {
  const router = useRouter()
  const horror = useHorrorStore()
  const konamiProgress = ref(0)
  const logoClickCount = ref(0)
  let logoClickTimer: number | undefined

  function handleKeyDown(e: KeyboardEvent) {
    const expected = KONAMI_CODE[konamiProgress.value]
    if (e.key.toLowerCase() === expected?.toLowerCase()) {
      konamiProgress.value = konamiProgress.value + 1
      if (konamiProgress.value === KONAMI_CODE.length) {
        konamiProgress.value = 0
        horror.unlockTerminal()
        horror.discoverSecret('konami-code')
        router.push('/terminal')
      }
    } else {
      konamiProgress.value = 0
    }
  }

  function handleLogoClick() {
    logoClickCount.value = logoClickCount.value + 1

    if (logoClickTimer !== undefined) {
      window.clearTimeout(logoClickTimer)
    }

    if (logoClickCount.value >= 7) {
      logoClickCount.value = 0
      horror.discoverSecret('logo-click')
      document.body.classList.add('logo-flash')
      window.setTimeout(() => {
        document.body.classList.remove('logo-flash')
      }, 200)
    }

    logoClickTimer = window.setTimeout(() => {
      logoClickCount.value = 0
    }, 2000)
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
    if (logoClickTimer !== undefined) {
      window.clearTimeout(logoClickTimer)
    }
  })

  return { handleLogoClick }
}
