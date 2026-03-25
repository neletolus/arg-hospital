export interface SubjectRecord {
  readonly id: string
  readonly subjectNumber: string
  readonly name: string
  readonly age: number
  readonly status: '適合' | '観察中' | '処理済' | '不明'
  readonly phase: number
  readonly notes: string
  readonly admissionDate: string
}

export interface HorrorState {
  readonly visitCount: number
  readonly discoveredSecrets: readonly string[]
  readonly hiddenPagesVisited: readonly string[]
  readonly firstVisitTimestamp: number
  readonly lastVisitTimestamp: number
  readonly terminalUnlocked: boolean
}

export type SecretId =
  | 'source-comment'
  | 'white-text'
  | 'robots-txt'
  | 'konami-code'
  | 'logo-click'
  | 'night-mode'
  | 'records-page'
  | 'protocol-page'
  | 'basement-page'
  | 'staff-real-page'
  | 'terminal'
