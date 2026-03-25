import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { SecretId } from '@/types/horror'

const STORAGE_KEY = 'ashitaba_horror_state'

interface PersistedState {
  readonly visitCount: number
  readonly discoveredSecrets: readonly string[]
  readonly hiddenPagesVisited: readonly string[]
  readonly firstVisitTimestamp: number
  readonly lastVisitTimestamp: number
  readonly terminalUnlocked: boolean
}

function loadState(): PersistedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as PersistedState
  } catch {
    return null
  }
}

function saveState(state: PersistedState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // localStorage unavailable (private browsing, etc.)
  }
}

export const useHorrorStore = defineStore('horror', () => {
  const persisted = loadState()
  const now = Date.now()

  const visitCount = ref(persisted?.visitCount ?? 0)
  const discoveredSecrets = ref<readonly string[]>(persisted?.discoveredSecrets ?? [])
  const hiddenPagesVisited = ref<readonly string[]>(persisted?.hiddenPagesVisited ?? [])
  const firstVisitTimestamp = ref(persisted?.firstVisitTimestamp ?? now)
  const lastVisitTimestamp = ref(persisted?.lastVisitTimestamp ?? now)
  const terminalUnlocked = ref(persisted?.terminalUnlocked ?? false)

  const horrorLevel = computed(() => {
    let level = 0
    if (visitCount.value >= 3) level = 1
    if (visitCount.value >= 5) level = 2
    if (discoveredSecrets.value.length >= 2) level = Math.max(level, 2)
    if (hiddenPagesVisited.value.length >= 1) level = Math.max(level, 3)
    if (hiddenPagesVisited.value.length >= 3) level = Math.max(level, 4)
    if (terminalUnlocked.value) level = 5
    return level
  })

  function persist() {
    saveState({
      visitCount: visitCount.value,
      discoveredSecrets: discoveredSecrets.value,
      hiddenPagesVisited: hiddenPagesVisited.value,
      firstVisitTimestamp: firstVisitTimestamp.value,
      lastVisitTimestamp: lastVisitTimestamp.value,
      terminalUnlocked: terminalUnlocked.value,
    })
  }

  function recordVisit() {
    visitCount.value = visitCount.value + 1
    lastVisitTimestamp.value = Date.now()
    persist()
  }

  function discoverSecret(id: SecretId) {
    if (discoveredSecrets.value.includes(id)) return
    discoveredSecrets.value = [...discoveredSecrets.value, id]
    persist()
  }

  function visitHiddenPage(path: string) {
    if (hiddenPagesVisited.value.includes(path)) return
    hiddenPagesVisited.value = [...hiddenPagesVisited.value, path]
    persist()
  }

  function unlockTerminal() {
    terminalUnlocked.value = true
    persist()
  }

  return {
    visitCount,
    discoveredSecrets,
    hiddenPagesVisited,
    firstVisitTimestamp,
    lastVisitTimestamp,
    terminalUnlocked,
    horrorLevel,
    recordVisit,
    discoverSecret,
    visitHiddenPage,
    unlockTerminal,
  }
})
