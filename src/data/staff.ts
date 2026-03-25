import type { StaffMember } from '@/types/staff'

export const staffMembers: readonly StaffMember[] = [
  {
    id: 'doctor-ashitaba',
    name: '明日葉 透',
    role: '院長・内科医',
    photo: '/images/staff/doctor.svg',
    message:
      '人体の可能性を信じ、地域の皆様の健康を守ることに全力を尽くしております。些細な体調の変化も、どうぞお気軽にご相談ください。',
  },
  {
    id: 'nurse-yamada',
    name: '山田 美咲',
    role: '看護師長',
    photo: '/images/staff/nurse-a.svg',
    message:
      '患者様に安心していただけるよう、丁寧な対応を心がけております。注射が苦手な方もお任せください。',
  },
  {
    id: 'nurse-suzuki',
    name: '鈴木 恵',
    role: '看護師',
    photo: '/images/staff/nurse-b.svg',
    message:
      '前職での経験を活かし、幅広い診療のサポートを行っております。何でもお声がけください。',
  },
  {
    id: 'receptionist-tanaka',
    name: '田中 幸子',
    role: '受付・医療事務',
    photo: '/images/staff/nurse-a.svg',
    message:
      '受付でお待ちしております。ご予約やお問い合わせなど、お気軽にお申し付けください。',
  },
  {
    id: 'lab-watanabe',
    name: '渡辺 健一',
    role: '臨床検査技師',
    photo: '/images/staff/technician.svg',
    message: '正確で迅速な検査を行い、先生の診療をサポートいたします。検査に関するご質問はお気軽にどうぞ。',
  },
] as const
