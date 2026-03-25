<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { parseCommand } from '@/composables/useTerminal'
import { useHorrorStore } from '@/stores/horror'

const router = useRouter()
const horror = useHorrorStore()

interface TerminalLine {
  readonly type: 'input' | 'output' | 'error' | 'system'
  readonly text: string
}

const lines = ref<readonly TerminalLine[]>([])
const currentInput = ref('')
const terminalRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

function addLines(newLines: readonly TerminalLine[]) {
  lines.value = [...lines.value, ...newLines]
}

async function scrollToBottom() {
  await nextTick()
  if (terminalRef.value) {
    terminalRef.value.scrollTop = terminalRef.value.scrollHeight
  }
}

async function handleSubmit() {
  const input = currentInput.value
  currentInput.value = ''

  addLines([{ type: 'input', text: `guest@ashitaba:~$ ${input}` }])

  const result = parseCommand(input)

  if (result.output === '__CLEAR__') {
    lines.value = []
    await scrollToBottom()
    return
  }

  if (result.output === '__SHUTDOWN__') {
    addLines([
      { type: 'system', text: 'System shutdown initiated...' },
      { type: 'system', text: 'WARNING: All session data has been recorded.' },
      { type: 'system', text: 'Redirecting to surface facility...' },
    ])
    await scrollToBottom()
    setTimeout(() => {
      router.push('/')
    }, 2000)
    return
  }

  if (result.output) {
    const outputLines = result.output.split('\n').map(
      (text): TerminalLine => ({
        type: result.isError ? 'error' : 'output',
        text,
      }),
    )
    addLines(outputLines)
  }

  await scrollToBottom()
}

function focusInput() {
  inputRef.value?.focus()
}

onMounted(() => {
  horror.discoverSecret('terminal')
  horror.visitHiddenPage('/terminal')

  addLines([
    { type: 'system', text: '╔══════════════════════════════════════════════╗' },
    { type: 'system', text: '║  ASHITABA RESEARCH FACILITY - INTERNAL NET   ║' },
    { type: 'system', text: '║  Terminal Access v3.1.7                      ║' },
    { type: 'system', text: '╚══════════════════════════════════════════════╝' },
    { type: 'system', text: '' },
    { type: 'system', text: 'WARNING: Unauthorized access detected.' },
    { type: 'system', text: 'Your session is being monitored.' },
    { type: 'system', text: '' },
    { type: 'output', text: 'Type "help" for available commands.' },
    { type: 'system', text: '' },
  ])

  focusInput()
})
</script>

<template>
  <div class="terminal-page" @click="focusInput">
    <div ref="terminalRef" class="terminal-screen">
      <div class="scanlines" />

      <div class="terminal-content">
        <div v-for="(line, i) in lines" :key="i" class="terminal-line" :class="`line-${line.type}`">
          {{ line.text }}
        </div>

        <div class="terminal-input-line">
          <span class="prompt">guest@ashitaba:~$&nbsp;</span>
          <form class="input-form" @submit.prevent="handleSubmit">
            <input
              ref="inputRef"
              v-model="currentInput"
              type="text"
              class="terminal-input"
              autocomplete="off"
              spellcheck="false"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.terminal-page {
  background: #0a0a0a;
  min-height: 100vh;
  display: flex;
  align-items: stretch;
}

.terminal-screen {
  flex: 1;
  position: relative;
  overflow-y: auto;
  padding: 1.5rem;
  font-family: 'Courier New', 'Monaco', 'Consolas', monospace;
  font-size: 0.85rem;
  line-height: 1.5;
  color: #00ff41;
}

.scanlines {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 10;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15) 0px,
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 3px
  );
}

.terminal-content {
  position: relative;
  z-index: 1;
  max-width: 900px;
}

.terminal-line {
  white-space: pre-wrap;
  word-break: break-all;
  min-height: 1.5em;
}

.line-input {
  color: #00ff41;
}

.line-output {
  color: #00cc33;
}

.line-error {
  color: #ff4444;
}

.line-system {
  color: #666;
}

.terminal-input-line {
  display: flex;
  align-items: center;
}

.prompt {
  color: #00ff41;
  white-space: nowrap;
}

.input-form {
  flex: 1;
}

.terminal-input {
  background: transparent;
  border: none;
  outline: none;
  color: #00ff41;
  font-family: inherit;
  font-size: inherit;
  width: 100%;
  caret-color: #00ff41;
}

/* CRT glow effect */
.terminal-screen::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse at center,
    transparent 60%,
    rgba(0, 0, 0, 0.4) 100%
  );
  z-index: 5;
}
</style>
