<script setup lang="ts">
import { ref } from 'vue'
import { newsArticles } from '@/data/news'

const latestNews = newsArticles.slice(0, 4)
const expandedId = ref<string | null>(null)

function toggleExpand(id: string) {
  expandedId.value = expandedId.value === id ? null : id
}
</script>

<template>
  <section class="section">
    <div class="container">
      <h2 class="section-title">お知らせ</h2>
      <div class="news-list">
        <div
          v-for="article in latestNews"
          :key="article.id"
          class="news-item"
          :class="{ 'news-item--expanded': expandedId === article.id }"
          @click="toggleExpand(article.id)"
        >
          <div class="news-item-header">
            <span class="news-date">{{ article.date }}</span>
            <span
              class="news-category"
              :class="{ 'news-category--recruitment': article.category === '募集' }"
            >
              {{ article.category }}
            </span>
            <span class="news-title">{{ article.title }}</span>
          </div>
          <div v-if="expandedId === article.id" class="news-content">
            <p>{{ article.content }}</p>
            <p
              v-if="article.category === '募集'"
              class="news-special-note"
            >
              ※本プログラムは完全予約制です。適性検査の結果によってはご参加いただけない場合がございます。
              なお、プログラム参加中のご連絡先変更はお受けできません。
              プログラム開始後の途中辞退につきましては、当院の規定に基づき対応いたします。
              詳細はお電話にてお問い合わせください。
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.news-item {
  cursor: pointer;
  transition: background var(--transition-fast);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
}

.news-item:hover {
  background: var(--color-border-light);
}

.news-item-header {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
}

.news-content {
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border-light);
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  line-height: 1.8;
}

.news-special-note {
  margin-top: var(--spacing-md);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}
</style>
