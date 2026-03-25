<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useHorrorStore } from '@/stores/horror'

const horror = useHorrorStore()

interface FormData {
  readonly name: string
  readonly phone: string
  readonly date: string
  readonly time: string
  readonly service: string
  readonly notes: string
}

const initialForm: FormData = {
  name: '',
  phone: '',
  date: '',
  time: '',
  service: '',
  notes: '',
}

const form = reactive({ ...initialForm })
const errors = reactive<Record<string, string>>({})
const submitted = ref(false)
const responseMessage = ref('')

const serviceOptions = [
  '一般内科',
  '健康診断',
  '予防接種',
  '生活習慣病外来',
  '特別健康診断プログラム',
  'その他',
] as const

const specialWarning = ref(false)

const timeSlots = [
  '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00',
  '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
] as const

function validate(): boolean {
  const newErrors: Record<string, string> = {}

  if (!form.name.trim()) {
    newErrors.name = 'お名前を入力してください'
  }
  if (!form.phone.trim()) {
    newErrors.phone = '電話番号を入力してください'
  } else if (!/^[\d-]+$/.test(form.phone)) {
    newErrors.phone = '正しい電話番号を入力してください'
  }
  if (!form.date) {
    newErrors.date = '希望日を選択してください'
  }
  if (!form.time) {
    newErrors.time = '希望時間を選択してください'
  }
  if (!form.service) {
    newErrors.service = '診療内容を選択してください'
  }

  Object.keys(errors).forEach((key) => delete errors[key])
  Object.assign(errors, newErrors)

  return Object.keys(newErrors).length === 0
}

function handleSubmit() {
  if (!validate()) return

  const isSpecialProgram = form.service === '特別健康診断プログラム'

  submitted.value = true

  if (isSpecialProgram) {
    responseMessage.value =
      '特別健康診断プログラムへのお申し込みを受け付けました。適性検査の日程について、48時間以内に担当者よりご連絡いたします。なお、この申し込みの取り消しはお受けしておりません。'
    horror.discoverSecret('source-comment')
    return
  }

  const count = horror.visitCount
  if (count >= 7) {
    responseMessage.value =
      '被験者候補として登録されました。取り消しはできません。担当者がお迎えに参ります。'
  } else if (count >= 4) {
    responseMessage.value =
      'ご予約を承りました。お身体のデータ、楽しみにしております。'
  } else {
    responseMessage.value =
      'ご予約を承りました。確認のお電話を差し上げますので、しばらくお待ちください。'
  }
}

function handleServiceChange() {
  if (form.service === '特別健康診断プログラム') {
    specialWarning.value = true
  } else {
    specialWarning.value = false
  }
}
</script>

<template>
  <div class="section">
    <div class="container">
      <h2 class="section-title">ご予約</h2>

      <div v-if="submitted" class="reservation-complete">
        <div class="card" style="text-align: center; max-width: 600px; margin: 0 auto">
          <p style="font-size: var(--font-size-2xl); margin-bottom: var(--spacing-md)">&#x2705;</p>
          <p>{{ responseMessage }}</p>
          <button class="btn btn-primary" style="margin-top: var(--spacing-xl)" @click="submitted = false">
            新しい予約をする
          </button>
        </div>
      </div>

      <form v-else class="reservation-form" @submit.prevent="handleSubmit">
        <div class="card" style="max-width: 600px; margin: 0 auto">
          <div class="form-group">
            <label class="form-label">
              お名前<span class="required">必須</span>
            </label>
            <input v-model="form.name" type="text" class="form-input" placeholder="山田 太郎" />
            <p v-if="errors.name" class="form-error">{{ errors.name }}</p>
          </div>

          <div class="form-group">
            <label class="form-label">
              電話番号<span class="required">必須</span>
            </label>
            <input
              v-model="form.phone"
              type="tel"
              class="form-input"
              placeholder="090-1234-5678"
            />
            <p v-if="errors.phone" class="form-error">{{ errors.phone }}</p>
          </div>

          <div class="form-group">
            <label class="form-label">
              希望日<span class="required">必須</span>
            </label>
            <input v-model="form.date" type="date" class="form-input" />
            <p v-if="errors.date" class="form-error">{{ errors.date }}</p>
          </div>

          <div class="form-group">
            <label class="form-label">
              希望時間<span class="required">必須</span>
            </label>
            <select v-model="form.time" class="form-select">
              <option value="">選択してください</option>
              <option v-for="slot in timeSlots" :key="slot" :value="slot">{{ slot }}</option>
            </select>
            <p v-if="errors.time" class="form-error">{{ errors.time }}</p>
          </div>

          <div class="form-group">
            <label class="form-label">
              診療内容<span class="required">必須</span>
            </label>
            <select v-model="form.service" class="form-select" @change="handleServiceChange">
              <option value="">選択してください</option>
              <option v-for="opt in serviceOptions" :key="opt" :value="opt">{{ opt }}</option>
            </select>
            <p v-if="errors.service" class="form-error">{{ errors.service }}</p>
            <div v-if="specialWarning" class="special-warning">
              <p>※本プログラムは適性検査を通過された方のみご参加いただけます。</p>
              <p>※対象：20〜35歳の健康な方</p>
              <p>※検査は完全個室にて終日実施いたします。</p>
              <p>※お申し込み後のキャンセルはお受けしておりません。</p>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">備考</label>
            <textarea
              v-model="form.notes"
              class="form-textarea"
              placeholder="症状やご要望がございましたらご記入ください"
            />
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%">予約する</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.special-warning {
  margin-top: var(--spacing-sm);
  padding: var(--spacing-md);
  background: rgba(231, 76, 60, 0.05);
  border-left: 3px solid var(--color-accent);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  line-height: 1.8;
}
</style>
