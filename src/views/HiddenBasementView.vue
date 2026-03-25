<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const messages = [
  { text: '...', delay: 1000 },
  { text: 'ここは暗い', delay: 3000 },
  { text: '誰かいますか', delay: 6000 },
  { text: '何日経ったか分からない', delay: 9000 },
  { text: '上から足音が聞こえる', delay: 12000 },
  { text: '今日も誰かが連れてこられた', delay: 15000 },
  { text: '叫び声が聞こえる', delay: 18000 },
  { text: '出してください', delay: 21000 },
  { text: '', delay: 24000 },
  { text: '被験者番号0047', delay: 27000 },
  { text: '記録終了', delay: 30000 },
] as const

const visibleMessages = ref<string[]>([])
const mouseX = ref(0)
const mouseY = ref(0)
const timers: number[] = []

function handleMouseMove(e: MouseEvent) {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

onMounted(() => {
  for (const msg of messages) {
    const timer = window.setTimeout(() => {
      visibleMessages.value = [...visibleMessages.value, msg.text]
    }, msg.delay)
    timers.push(timer)
  }

  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  for (const timer of timers) {
    window.clearTimeout(timer)
  }
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <div
    class="basement-page"
    :style="{
      '--mouse-x': `${mouseX}px`,
      '--mouse-y': `${mouseY}px`,
    }"
  >
    <div class="spotlight-mask">
      <div class="basement-content">
        <p
          v-for="(msg, i) in visibleMessages"
          :key="i"
          class="basement-message"
          :class="{ 'message-final': i >= messages.length - 2 }"
        >
          {{ msg }}
        </p>
      </div>

      <RouterLink to="/" class="basement-exit">戻る</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.basement-page {
  background: #000;
  min-height: 100vh;
  color: #666;
  font-family: serif;
  cursor: none;
  overflow: hidden;
  position: relative;
}

.spotlight-mask {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: radial-gradient(
    circle 120px at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(30, 30, 30, 0.6) 0%,
    rgba(0, 0, 0, 0.98) 100%
  );
}

.basement-content {
  max-width: 400px;
  text-align: center;
}

.basement-message {
  margin: 1.5rem 0;
  font-size: 1rem;
  opacity: 0;
  animation: fadeIn 2s forwards;
  line-height: 1.6;
}

.message-final {
  color: #8b0000;
}

.basement-exit {
  position: fixed;
  bottom: 20px;
  right: 20px;
  color: #333;
  font-size: 0.7rem;
  text-decoration: none;
  opacity: 0.3;
  transition: opacity 300ms;
}

.basement-exit:hover {
  opacity: 0.6;
  color: #555;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
