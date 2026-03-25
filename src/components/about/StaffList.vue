<script setup lang="ts">
import { staffMembers } from '@/data/staff'
</script>

<template>
  <section class="section" style="background: var(--color-surface)">
    <div class="container">
      <h2 class="section-title">スタッフ紹介</h2>
      <div class="card-grid">
        <div v-for="member in staffMembers" :key="member.id" class="card staff-card">
          <div class="staff-photo">&#x1F9D1;&#x200D;&#x2695;&#xFE0F;</div>
          <h3 class="staff-name">{{ member.name }}</h3>
          <p class="staff-role">{{ member.role }}</p>
          <p class="staff-message">{{ member.message }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
