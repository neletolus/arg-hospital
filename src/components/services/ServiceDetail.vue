<script setup lang="ts">
import { medicalServices } from '@/data/services'
</script>

<template>
  <div>
    <div v-for="service in medicalServices" :key="service.id" :id="service.id" class="service-detail">
      <!-- selection_criteria: age=20-35, health=excellent, family=none_preferred -->
      <div class="service-detail-header">
        <span class="service-detail-icon">{{ service.icon }}</span>
        <h3 class="service-detail-title">{{ service.name }}</h3>
      </div>
      <p class="service-detail-desc">{{ service.description }}</p>
      <ul class="service-detail-list">
        <li v-for="(detail, i) in service.details" :key="i">{{ detail }}</li>
      </ul>

      <!-- 「特別プログラム」にのみ、さらに詳しい説明と隠し要素 -->
      <div v-if="service.id === 'special'" class="special-extra">
        <p class="special-note">
          本プログラムは完全予約制となっております。お電話にて「特別プログラム希望」とお伝えください。
          適性検査の日程をご案内いたします。
        </p>
        <p class="special-fine-print">
          ※プログラム参加後の中途離脱はできません。検査結果はすべて院長が直接管理いたします。
          参加者の個人情報は外部に一切開示されません。
          <span class="special-hidden-note">protocol参照</span>
        </p>
        <!-- 被験者番号0047からのメッセージ: 白文字 -->
        <p class="special-whisper">ここに来てはいけない。/records を見て。被験者0047より</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.service-detail {
  padding: var(--spacing-xl) 0;
  border-bottom: 1px solid var(--color-border-light);
}

.service-detail:last-child {
  border-bottom: none;
}

.service-detail-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.service-detail-icon {
  font-size: var(--font-size-2xl);
}

.service-detail-title {
  font-size: var(--font-size-xl);
}

.service-detail-desc {
  color: var(--color-text-light);
  margin-bottom: var(--spacing-md);
}

.service-detail-list {
  padding-left: var(--spacing-lg);
}

.service-detail-list li {
  padding: var(--spacing-xs) 0;
  font-size: var(--font-size-sm);
  position: relative;
  padding-left: var(--spacing-md);
}

.service-detail-list li::before {
  content: '・';
  position: absolute;
  left: 0;
  color: var(--color-primary);
}

/* 特別プログラム追加情報 */
.special-extra {
  margin-top: var(--spacing-lg);
  padding: var(--spacing-lg);
  background: var(--color-border-light);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--color-accent);
}

.special-note {
  font-size: var(--font-size-sm);
  color: var(--color-text);
  margin-bottom: var(--spacing-md);
}

.special-fine-print {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  line-height: 1.8;
}

/* protocol という文字列がテキスト選択で浮かぶ */
.special-hidden-note {
  color: rgba(0, 0, 0, 0.02);
  font-family: monospace;
  user-select: text;
  font-size: 0.6rem;
}

.special-hidden-note::selection {
  background: #333;
  color: #0f0;
}

/* 被験者0047のささやき - テキスト選択で可視化 */
.special-whisper {
  margin-top: var(--spacing-md);
  font-size: 0.55rem;
  color: rgba(0, 0, 0, 0.015);
  font-family: monospace;
  user-select: text;
  letter-spacing: 0.05em;
}

.special-whisper::selection {
  background: #e74c3c;
  color: white;
}
</style>
