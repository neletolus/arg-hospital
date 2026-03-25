import type { ClinicInfo } from '@/types/clinic'

export const clinicInfo: ClinicInfo = {
  name: '明日葉内科クリニック',
  nameKana: 'あしたばないかくりにっく',
  postalCode: '〒160-0023',
  address: '東京都新宿区西新宿3-7-1 新宿パークタワーN棟2F',
  phone: '03-6820-0047',
  fax: '03-6820-0048',
  hours: [
    { day: '月', morning: '9:00〜12:30', afternoon: '14:30〜18:00' },
    { day: '火', morning: '9:00〜12:30', afternoon: '14:30〜18:00' },
    { day: '水', morning: '9:00〜12:30', afternoon: null },
    { day: '木', morning: '9:00〜12:30', afternoon: '14:30〜18:00' },
    { day: '金', morning: '9:00〜12:30', afternoon: '14:30〜20:00' },
    { day: '土', morning: '9:00〜13:00', afternoon: null },
    { day: '日', morning: null, afternoon: null },
  ],
  closedDays: '水曜午後・土曜午後・日曜・祝日',
  parking: '提携駐車場あり（1時間無料）',
  coordinates: {
    lat: 35.6896,
    lng: 139.6921,
  },
} as const
