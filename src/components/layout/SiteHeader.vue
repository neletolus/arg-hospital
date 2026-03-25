<script setup lang="ts">
import { ref, inject, computed } from 'vue'
import { RouterLink } from 'vue-router'

const isMenuOpen = ref(false)
const onLogoClick = inject<() => void>('onLogoClick', () => {})
const nightModeRef = inject<import('vue').Ref<boolean>>('nightMode', ref(false))
const isNightMode = computed(() => nightModeRef.value)
const navItems = [
  { path: '/', label: 'ホーム' },
  { path: '/about', label: '院長紹介' },
  { path: '/services', label: '診療案内' },
  { path: '/access', label: 'アクセス' },
  { path: '/reviews', label: '患者様の声' },
  { path: '/reservation', label: 'ご予約' },
] as const

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <!-- 明日葉内科クリニック ヘッダー -->
  <header class="site-header">
    <div class="container">
      <RouterLink
        to="/"
        class="header-logo"
        :style="isNightMode ? { filter: 'hue-rotate(15deg)' } : {}"
        aria-label="明日葉研究所 トップページ"
        @click.prevent="onLogoClick"
      >
        <span class="header-logo-icon">葉</span>
        <span>明日葉内科クリニック</span>
      </RouterLink>

      <nav class="nav-menu" :class="{ 'is-open': isMenuOpen }">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-link"
          @click="isMenuOpen = false"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <button class="hamburger" aria-label="メニュー" @click="toggleMenu">
        <span />
        <span />
        <span />
      </button>
    </div>
  </header>
</template>
