<script setup lang="ts">
import { protocolDocument } from '@/data/protocol'
</script>

<template>
  <div class="protocol-page">
    <div class="protocol-document">
      <div class="protocol-stamp">機 密</div>

      <div class="protocol-header">
        <p class="classification">{{ protocolDocument.classification }}</p>
        <h1 class="protocol-title">{{ protocolDocument.title }}</h1>
        <div class="protocol-meta">
          <p>バージョン: {{ protocolDocument.version }}</p>
          <p>承認者: {{ protocolDocument.approvedBy }}</p>
          <p>発行日: {{ protocolDocument.date }}</p>
        </div>
      </div>

      <div class="protocol-body">
        <div
          v-for="(section, i) in protocolDocument.sections"
          :key="i"
          class="protocol-section"
        >
          <h2 class="protocol-section-title">{{ section.title }}</h2>
          <p class="protocol-section-content">{{ section.content }}</p>
        </div>
      </div>

      <div class="protocol-footer">
        <p>本文書の無断複製・持ち出しを禁ずる</p>
        <p>違反者には処理プロトコルBが適用される</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.protocol-page {
  background: #f5f0e8;
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  justify-content: center;
}

.protocol-document {
  background: white;
  max-width: 800px;
  width: 100%;
  padding: 3rem;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
  position: relative;
  line-height: 1.8;
}

.protocol-stamp {
  position: absolute;
  top: 40px;
  right: 40px;
  font-size: 2.5rem;
  font-weight: 900;
  color: rgba(220, 38, 38, 0.25);
  border: 4px solid rgba(220, 38, 38, 0.25);
  padding: 0.25rem 1rem;
  transform: rotate(15deg);
  letter-spacing: 0.5rem;
}

.protocol-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #333;
}

.classification {
  color: #dc2626;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.2rem;
  margin-bottom: 1rem;
}

.protocol-title {
  font-size: 1.5rem;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  line-height: 1.4;
}

.protocol-meta {
  font-size: 0.85rem;
  color: #555;
}

.protocol-meta p {
  margin: 0.2rem 0;
}

.protocol-body {
  color: #333;
}

.protocol-section {
  margin-bottom: 2rem;
}

.protocol-section-title {
  font-size: 1.1rem;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.protocol-section-content {
  font-size: 0.95rem;
  white-space: pre-wrap;
  line-height: 1.8;
}

.protocol-footer {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid #ddd;
  text-align: center;
  font-size: 0.8rem;
  color: #999;
}

.protocol-footer p {
  margin: 0.2rem 0;
}
</style>
