import { onMounted, onUnmounted } from 'vue'
import { useHorrorStore } from '@/stores/horror'

export function useSecretDetection() {
  const horror = useHorrorStore()

  function handleSelectionChange() {
    const selection = window.getSelection()
    if (!selection || selection.isCollapsed) return

    const text = selection.toString().trim()
    if (!text) return

    const hiddenKeywords = [
      '被験者の皆様',
      '逃げてください',
      'protocol参照',
      '被験者0047',
      '/records',
      'SUB-0023',
      'SUB-0047',
    ] as const

    for (const keyword of hiddenKeywords) {
      if (text.includes(keyword)) {
        horror.discoverSecret('white-text')
        return
      }
    }
  }

  onMounted(() => {
    document.addEventListener('selectionchange', handleSelectionChange)
  })

  onUnmounted(() => {
    document.removeEventListener('selectionchange', handleSelectionChange)
  })
}
