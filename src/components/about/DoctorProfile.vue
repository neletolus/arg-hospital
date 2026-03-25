<script setup lang="ts">
import { useHorrorStore } from '@/stores/horror'

const horror = useHorrorStore()

const career = [
  { text: '東京大学医学部 卒業（2005年）', suspicious: false },
  { text: '東京大学医学部附属病院 内科 研修医', suspicious: false },
  { text: '国立国際医療研究センター 内科 医員', suspicious: false },
  { text: '国立生体工学研究所 特別研究員（2019年〜2024年）', suspicious: true },
  { text: '明日葉内科クリニック 開院（2024年）', suspicious: false },
] as const

function handleSuspiciousClick() {
  horror.discoverSecret('source-comment')
  // eslint-disable-next-line no-console
  console.log(
    '%c[ASHITABA INTERNAL] %c国立生体工学研究所 → 旧称: 国防生体工学研究所。2018年の事故により改名。詳細は /protocol を参照。',
    'color: red; font-weight: bold;',
    'color: #666;',
  )
  // eslint-disable-next-line no-console
  console.log(
    '%c記録を確認するには /records へアクセスしてください。',
    'color: #999; font-style: italic;',
  )
}
</script>

<template>
  <!-- 明日葉 透 = 旧所属: 国防生体工学研究所 主任研究官 -->
  <section class="section">
    <div class="container">
      <h2 class="section-title">院長紹介</h2>
      <div class="doctor-section">
        <div class="doctor-photo">&#x1F468;&#x200D;&#x2695;&#xFE0F;</div>
        <div>
          <h3 class="doctor-name">明日葉 透</h3>
          <p class="doctor-title">院長 / 内科専門医・総合内科専門医</p>
          <div class="doctor-greeting">
            <p>
              はじめまして、院長の明日葉です。私は長年にわたり大学病院や研究機関で
              内科診療と研究に携わってまいりました。
            </p>
            <p>
              人体の可能性を探求することに情熱を注いできた経験を活かし、
              地域の皆様一人ひとりの健康状態を深く理解した上で、
              最適な医療を提供することを目指しております。
            </p>
            <p>
              どんな小さな体調の変化でも、お気軽にご相談ください。
              あなたの身体のことを、私たちに任せてください。
            </p>
          </div>
          <div class="doctor-career">
            <h3>経歴</h3>
            <ul>
              <li
                v-for="(item, i) in career"
                :key="i"
                :class="{ 'career-suspicious': item.suspicious }"
                @click="item.suspicious ? handleSuspiciousClick() : undefined"
              >
                {{ item.text }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.career-suspicious {
  cursor: pointer;
  position: relative;
  transition: color var(--transition-fast);
}

.career-suspicious:hover {
  color: var(--color-primary);
}

/* ホバーで下線が出て「リンクっぽく」見える */
.career-suspicious:hover::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: var(--spacing-lg);
  right: 0;
  height: 1px;
  background: var(--color-primary);
  opacity: 0.4;
}
</style>
