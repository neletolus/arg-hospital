<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { subjectRecords } from '@/data/records'
import type { SubjectRecord } from '@/types/horror'

const selectedRecord = ref<SubjectRecord | null>(null)
const assignedNumber = ref('')

onMounted(() => {
  assignedNumber.value = String(Math.floor(1000 + Math.random() * 9000))
})

function selectRecord(record: SubjectRecord) {
  selectedRecord.value = selectedRecord.value?.id === record.id ? null : record
}

function statusClass(status: SubjectRecord['status']): string {
  const classes: Record<SubjectRecord['status'], string> = {
    '適合': 'status-compatible',
    '観察中': 'status-observing',
    '処理済': 'status-processed',
    '不明': 'status-unknown',
  }
  return classes[status]
}
</script>

<template>
  <div class="records-page">
    <div class="terminal-header">
      <p class="terminal-line">ASHITABA RESEARCH FACILITY - SUBJECT DATABASE</p>
      <p class="terminal-line dim">Access Level: UNAUTHORIZED</p>
      <p class="terminal-line dim">Session ID: {{ Date.now().toString(16).toUpperCase() }}</p>
      <p class="terminal-line warning">WARNING: This access has been logged.</p>
    </div>

    <div class="terminal-divider">
      ════════════════════════════════════════════════════════
    </div>

    <table class="records-table">
      <thead>
        <tr>
          <th>被験者番号</th>
          <th>名前</th>
          <th>年齢</th>
          <th>ステータス</th>
          <th>フェーズ</th>
          <th>登録日</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="record in subjectRecords"
          :key="record.id"
          class="record-row"
          :class="{ selected: selectedRecord?.id === record.id }"
          @click="selectRecord(record)"
        >
          <td>{{ record.subjectNumber }}</td>
          <td>{{ record.name }}</td>
          <td>{{ record.age }}</td>
          <td>
            <span class="status-badge" :class="statusClass(record.status)">
              {{ record.status }}
            </span>
          </td>
          <td>Phase {{ record.phase }}</td>
          <td>{{ record.admissionDate }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="selectedRecord" class="record-detail">
      <p class="terminal-line">
        ── RECORD DETAIL: {{ selectedRecord.subjectNumber }} ──
      </p>
      <p class="detail-notes">{{ selectedRecord.notes }}</p>
    </div>

    <div class="terminal-divider">
      ════════════════════════════════════════════════════════
    </div>

    <div class="records-nav">
      <p class="terminal-line dim">Related files:</p>
      <p class="terminal-line">
        > <RouterLink to="/protocol" class="terminal-link">protocol/phase3_requirements.doc</RouterLink>
        — 第3フェーズ実施要項
      </p>
      <p class="terminal-line">
        > <RouterLink to="/staff/real" class="terminal-link">staff/internal_registry.dat</RouterLink>
        — 内部スタッフ登録簿
      </p>
      <p class="terminal-line">
        > <RouterLink to="/basement" class="terminal-link">facility/basement_log.txt</RouterLink>
        — 地下施設ログ（被験者0047 最終記録）
      </p>
    </div>

    <div class="terminal-divider">
      ════════════════════════════════════════════════════════
    </div>

    <p class="terminal-footer">
      あなたのアクセスは記録されました。被験者候補番号: {{ assignedNumber }}
    </p>
  </div>
</template>

<style scoped>
.records-page {
  background: #0a0a0a;
  color: #00ff41;
  font-family: 'Courier New', 'Monaco', monospace;
  min-height: 100vh;
  padding: 2rem;
  font-size: 0.85rem;
  line-height: 1.6;
}

.terminal-header {
  margin-bottom: 1rem;
}

.terminal-line {
  margin: 0.2rem 0;
}

.terminal-line.dim {
  color: #006b1a;
}

.terminal-line.warning {
  color: #ff4444;
  animation: blink 1.5s infinite;
}

.terminal-divider {
  color: #006b1a;
  margin: 1rem 0;
  overflow: hidden;
}

.records-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.records-table th {
  text-align: left;
  padding: 0.5rem;
  border-bottom: 1px solid #006b1a;
  color: #00ff41;
  font-weight: normal;
  text-transform: uppercase;
  font-size: 0.75rem;
}

.records-table td {
  padding: 0.5rem;
  border-bottom: 1px solid rgba(0, 107, 26, 0.3);
}

.record-row {
  cursor: pointer;
  transition: background 150ms;
}

.record-row:hover {
  background: rgba(0, 255, 65, 0.05);
}

.record-row.selected {
  background: rgba(0, 255, 65, 0.1);
}

.status-badge {
  padding: 0.15rem 0.5rem;
  border-radius: 2px;
  font-size: 0.75rem;
}

.status-compatible {
  background: rgba(0, 255, 65, 0.2);
  color: #00ff41;
}

.status-observing {
  background: rgba(255, 255, 0, 0.2);
  color: #ffff00;
}

.status-processed {
  background: rgba(255, 0, 0, 0.2);
  color: #ff4444;
}

.status-unknown {
  background: rgba(255, 165, 0, 0.2);
  color: #ffa500;
}

.record-detail {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #006b1a;
  background: rgba(0, 255, 65, 0.02);
}

.detail-notes {
  color: #00cc33;
  margin-top: 0.5rem;
  white-space: pre-wrap;
}

.terminal-footer {
  color: #ff4444;
  margin-top: 1rem;
  font-size: 0.8rem;
}

.records-nav {
  margin: 1rem 0;
}

.terminal-link {
  color: #00ff41;
  text-decoration: underline;
  text-decoration-color: #006b1a;
  transition: text-decoration-color 150ms;
}

.terminal-link:hover {
  color: #66ff88;
  text-decoration-color: #00ff41;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
</style>
