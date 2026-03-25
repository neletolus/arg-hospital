<script setup lang="ts">
import { clinicInfo } from '@/data/clinic'
</script>

<template>
  <!-- facility_status: ACTIVE | subjects_current: 23 | phase: 3 -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <h3 class="footer-heading">{{ clinicInfo.name }}</h3>
          <p class="footer-text">
            {{ clinicInfo.postalCode }}<br />
            {{ clinicInfo.address }}<br />
            TEL: {{ clinicInfo.phone }}
          </p>
        </div>

        <div>
          <h3 class="footer-heading">診療時間</h3>
          <p class="footer-text">
            月・火・木 9:00〜12:30 / 14:30〜18:00<br />
            金 9:00〜12:30 / 14:30〜20:00<br />
            水・土 午前のみ<br />
            休診：日曜・祝日
          </p>
        </div>

        <div>
          <h3 class="footer-heading">リンク</h3>
          <p class="footer-text">
            <RouterLink to="/" class="footer-link">ホーム</RouterLink><br />
            <RouterLink to="/about" class="footer-link">院長紹介</RouterLink><br />
            <RouterLink to="/services" class="footer-link">診療案内</RouterLink><br />
            <RouterLink to="/reservation" class="footer-link">ご予約</RouterLink>
          </p>
        </div>
      </div>

      <div class="footer-bottom">
        <span>&copy; 2025 明日葉内科クリニック All Rights Reserved.</span>
        <span class="hidden-message" aria-hidden="true"
          >被験者の皆様、逃げてください</span
        >
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-link {
  color: #bdc3c7;
  font-size: var(--font-size-sm);
}

.footer-link:hover {
  color: white;
}

.hidden-message {
  color: rgba(44, 62, 80, 0.02);
  font-size: 0.5rem;
  user-select: text;
  position: absolute;
  pointer-events: none;
}
</style>
