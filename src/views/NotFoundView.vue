<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, ref, onMounted } from 'vue'

const route = useRoute()
const showGlitch = ref(false)

const hiddenPathHints: Record<string, string> = {
  '/records': '被験者データベースへのアクセスが試行されました',
  '/protocol': '研究プロトコルへのアクセスが試行されました',
  '/basement': '地下施設ログへのアクセスが試行されました',
  '/staff/real': '内部登録簿へのアクセスが試行されました',
  '/terminal': 'ターミナルへのアクセスにはアクセスコードが必要です',
  '/ashitaba': 'Project Ashitaba は存在しません',
  '/subject': '被験者情報は /records で管理されています',
  '/experiment': 'そのようなページは存在しません。本当に。',
}

const matchedHint = computed(() => {
  for (const [path, hint] of Object.entries(hiddenPathHints)) {
    if (route.path.startsWith(path)) return hint
  }
  return null
})

const isHiddenAttempt = computed(() => matchedHint.value !== null)

onMounted(() => {
  if (isHiddenAttempt.value) {
    showGlitch.value = true
    setTimeout(() => {
      showGlitch.value = false
    }, 150)
  }
})
</script>

<template>
  <div class="not-found" :class="{ 'not-found--glitch': showGlitch }">
    <template v-if="isHiddenAttempt">
      <p class="not-found-code not-found-code--warn">403</p>
      <p class="not-found-text">アクセスが記録されました</p>
      <p class="not-found-hint">{{ matchedHint }}</p>

      <!-- ソースを見る人へのヒント -->
      <!-- access_log: path={{ route.path }} | status=DENIED | redirect_hint=robots.txt -->
      <!-- このページのソースコードに辿り着いたあなたへ: robots.txt を確認してください -->

      <RouterLink to="/" class="btn btn-primary" style="margin-top: var(--spacing-xl)">
        トップページへ戻る
      </RouterLink>
    </template>
    <template v-else>
      <p class="not-found-code">404</p>
      <p class="not-found-text">お探しのページが見つかりません</p>
      <RouterLink to="/" class="btn btn-primary" style="margin-top: var(--spacing-xl)">
        トップページへ戻る
      </RouterLink>
    </template>
  </div>
</template>

<style scoped>
.not-found-code--warn {
  color: var(--color-accent) !important;
}

.not-found-hint {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  font-family: monospace;
  margin-top: var(--spacing-sm);
}

.not-found--glitch {
  animation: page-glitch 150ms;
}

@keyframes page-glitch {
  0% { filter: none; }
  25% { filter: invert(1) hue-rotate(90deg); }
  50% { filter: invert(0) hue-rotate(180deg); }
  75% { filter: invert(1) hue-rotate(270deg); }
  100% { filter: none; }
}
</style>
