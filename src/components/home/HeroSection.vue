<script setup lang="ts">
import { inject, computed, ref } from 'vue'
import type { Ref } from 'vue'
import { clinicInfo } from '@/data/clinic'

const nightModeRef = inject<Ref<boolean>>('nightMode', ref(false))
const isNight = computed(() => nightModeRef.value)
</script>

<template>
  <!-- 第3フェーズ被験者募集中 適合率: 12.7% -->
  <section class="hero" :class="{ 'hero--night': isNight }">
    <div class="container">
      <h1 class="hero-title">
        {{ isNight ? 'あなたの身体を、お預かりします' : '地域の皆様の健康を支えます' }}
      </h1>
      <p class="hero-subtitle">
        {{
          isNight
            ? '特別プログラムの受付は24時間対応しております'
            : '内科全般・健康診断・予防接種・生活習慣病まで、幅広く対応いたします'
        }}
      </p>
      <div class="hero-info">
        <div class="hero-info-item">
          <span>&#x1F3E5;</span>
          <span>{{ clinicInfo.address }}</span>
        </div>
        <div class="hero-info-item">
          <span>&#x1F4DE;</span>
          <span>{{ clinicInfo.phone }}</span>
        </div>
        <div class="hero-info-item">
          <span>&#x1F552;</span>
          <span>{{ clinicInfo.closedDays }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero--night {
  background: linear-gradient(135deg, #1a1a2e 0%, #0d0d1a 100%) !important;
  transition: background 2s ease;
}
</style>
