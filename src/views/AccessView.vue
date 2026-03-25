<script setup lang="ts">
import ClinicMap from '@/components/access/ClinicMap.vue'
import ClinicInfo from '@/components/access/ClinicInfo.vue'
</script>

<template>
  <div class="section">
    <div class="container">
      <h2 class="section-title">アクセス</h2>
      <div class="access-grid">
        <ClinicMap />
        <ClinicInfo />
      </div>
    </div>
  </div>
</template>
