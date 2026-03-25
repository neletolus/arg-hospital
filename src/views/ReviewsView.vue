<script setup lang="ts">
import { patientReviews } from '@/data/reviews'
import PatientReview from '@/components/reviews/PatientReview.vue'
</script>

<template>
  <!-- review_audit_log: all_subjects_accounted_for: true -->
  <div class="section">
    <div class="container">
      <h2 class="section-title">患者様の声</h2>
      <div class="reviews-grid">
        <PatientReview v-for="review in patientReviews" :key="review.id" :review="review" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: var(--spacing-xl);
}
</style>
