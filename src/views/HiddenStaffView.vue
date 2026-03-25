<script setup lang="ts">
const realStaff = [
  { number: 'ADMIN-001', name: '明日葉 透', role: '施設管理者 / 主任研究官', status: '運用中' },
  { number: 'STAFF-003', name: '山田 美咲', role: '投薬管理担当', status: '運用中' },
  { number: 'SUB-0023', name: '鈴木 恵', role: '被験者（適合・社会復帰訓練中）', status: '適合' },
  { number: 'STAFF-007', name: '田中 幸子', role: '選別・受付担当', status: '運用中' },
  { number: 'STAFF-012', name: '渡辺 健一', role: '検体分析 / 処理プロトコルB担当', status: '運用中' },
] as const
</script>

<template>
  <div class="real-staff-page">
    <div class="container">
      <h2 class="real-staff-title">STAFF REGISTRY - INTERNAL</h2>
      <p class="real-staff-warning">
        このページは内部関係者のみが閲覧可能です。不正アクセスは記録されます。
      </p>

      <div class="real-staff-grid">
        <div v-for="member in realStaff" :key="member.number" class="real-staff-card">
          <div class="real-staff-photo">&#x1F9D1;&#x200D;&#x2695;&#xFE0F;</div>
          <p class="real-staff-number">{{ member.number }}</p>
          <h3 class="real-staff-name">{{ member.name }}</h3>
          <p class="real-staff-role">{{ member.role }}</p>
          <span
            class="real-staff-status"
            :class="{
              'status-active': member.status === '運用中',
              'status-subject': member.status === '適合',
            }"
          >
            {{ member.status }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.real-staff-page {
  background: #1a1a2e;
  min-height: 100vh;
  color: #e0e0e0;
  padding: 3rem 1.5rem;
}

.real-staff-title {
  text-align: center;
  font-size: 1.2rem;
  letter-spacing: 0.3rem;
  color: #888;
  margin-bottom: 0.5rem;
  font-family: monospace;
}

.real-staff-warning {
  text-align: center;
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 2rem;
}

.real-staff-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
}

.real-staff-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
}

.real-staff-photo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  filter: grayscale(1) contrast(1.2);
  background: rgba(255, 255, 255, 0.05);
}

.real-staff-number {
  font-family: monospace;
  font-size: 0.75rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.real-staff-name {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.real-staff-role {
  font-size: 0.8rem;
  color: #999;
  margin-bottom: 0.75rem;
}

.real-staff-status {
  display: inline-block;
  font-size: 0.7rem;
  padding: 0.2rem 0.6rem;
  border-radius: 3px;
  font-family: monospace;
}

.status-active {
  background: rgba(0, 200, 100, 0.15);
  color: #00c864;
}

.status-subject {
  background: rgba(255, 165, 0, 0.15);
  color: #ffa500;
}
</style>
