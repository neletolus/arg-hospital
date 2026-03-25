<script setup lang="ts">
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import { useVisitTracker } from '@/composables/useVisitTracker'
import { useEasterEggs } from '@/composables/useEasterEggs'
import { useHorrorProgression } from '@/composables/useHorrorProgression'
import { useTimeOfDay } from '@/composables/useTimeOfDay'
import { useSecretDetection } from '@/composables/useSecretDetection'
import { provide } from 'vue'

const { horrorLevel } = useHorrorProgression()
const { isNightMode } = useTimeOfDay()
const { handleLogoClick } = useEasterEggs()
useVisitTracker()
useSecretDetection()

provide('nightMode', isNightMode)
provide('horrorLevel', horrorLevel)
provide('onLogoClick', handleLogoClick)
</script>

<template>
  <div id="clinic-app" :class="{ 'night-mode': isNightMode }">
    <SiteHeader />
    <main>
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
main {
  min-height: calc(100vh - var(--header-height) - 200px);
}
</style>
