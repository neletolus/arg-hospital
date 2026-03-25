import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useHorrorStore } from '@/stores/horror'

export function useVisitTracker() {
  const route = useRoute()
  const horror = useHorrorStore()

  onMounted(() => {
    horror.recordVisit()
  })

  watch(
    () => route.fullPath,
    () => {
      if (route.meta.hidden) {
        horror.visitHiddenPage(route.path)
        horror.discoverSecret('robots-txt')
      }
    },
  )

  return {
    visitCount: horror.visitCount,
    horrorLevel: horror.horrorLevel,
  }
}
