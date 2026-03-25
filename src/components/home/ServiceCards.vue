<script setup lang="ts">
import { medicalServices } from '@/data/services'

const mainServices = medicalServices.slice(0, 4)
</script>

<template>
  <section class="section" style="background: var(--color-surface)">
    <div class="container">
      <h2 class="section-title">診療案内</h2>
      <div class="card-grid">
        <RouterLink
          v-for="service in mainServices"
          :key="service.id"
          :to="`/services#${service.id}`"
          class="card service-card"
        >
          <div class="service-card-icon">{{ service.icon }}</div>
          <h3 class="service-card-title">{{ service.name }}</h3>
          <p class="service-card-desc">{{ service.description }}</p>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.service-card {
  color: inherit;
  display: block;
}
</style>
