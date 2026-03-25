<script setup lang="ts">
import { ref } from 'vue'
import type { PatientReview } from '@/types/review'

const props = defineProps<{
  review: PatientReview
}>()

const expanded = ref(false)

function renderStars(rating: number): string {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating)
}

const isSpecialReview = ['rev-005', 'rev-007'].includes(props.review.id)

const extendedComments: Record<string, string> = {
  'rev-005':
    '投薬が始まってから3日目で視界がクリアになりました。1週間後には、重い荷物が羽のように軽く感じるように。先生は「順調です」と仰っていました。他の参加者は…あまり見かけなくなりましたが、きっと退院されたのでしょう。地下から聞こえる声は空調の音だと思います。',
  'rev-007':
    '最初の検査は普通の健康診断と同じでした。でも2回目から注射の回数が増えて、身体が熱くなって。目が覚めたら知らない部屋にいました。でも今は本当に感謝しています。先生の言う通りにすれば大丈夫です。この文章も先生に確認していただいてから投稿しています。',
}
</script>

<template>
  <!-- review_id: {{ review.id }} | subject_id: SUB-{{ review.id.split('-')[1] }} | status: ASSIMILATED -->
  <div class="card review-card" :class="{ 'review-card--special': isSpecialReview }">
    <div class="review-stars">{{ renderStars(review.rating) }}</div>
    <p class="review-comment">{{ review.comment }}</p>

    <!-- 不穏レビューにのみ「続きを読む」 -->
    <template v-if="isSpecialReview">
      <button v-if="!expanded" class="read-more" @click="expanded = true">
        ...続きを読む
      </button>
      <div v-else class="review-extended">
        <p class="review-extended-text">{{ extendedComments[review.id] }}</p>
        <span class="review-subject-tag">{{ review.id === 'rev-005' ? 'SUB-0023' : 'SUB-0047' }}</span>
      </div>
    </template>

    <div class="review-meta">
      <span>{{ review.name }}（{{ review.age }}）</span>
      <span>{{ review.service }} / {{ review.date }}</span>
    </div>
  </div>
</template>

<style scoped>
.review-card--special {
  border-left-color: var(--color-accent);
}

.read-more {
  background: none;
  border: none;
  color: var(--color-primary);
  font-size: var(--font-size-xs);
  cursor: pointer;
  padding: 0;
  margin: var(--spacing-sm) 0;
}

.read-more:hover {
  text-decoration: underline;
}

.review-extended {
  margin: var(--spacing-sm) 0;
  padding: var(--spacing-sm);
  background: var(--color-border-light);
  border-radius: var(--radius-sm);
  position: relative;
}

.review-extended-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  line-height: 1.8;
}

/* 被験者番号：テキスト選択しないと見えない */
.review-subject-tag {
  display: block;
  margin-top: var(--spacing-xs);
  font-size: 0.6rem;
  color: rgba(0, 0, 0, 0.03);
  font-family: monospace;
  user-select: text;
}

.review-subject-tag::selection {
  background: var(--color-accent);
  color: white;
}
</style>
