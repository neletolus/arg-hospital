export interface NewsArticle {
  readonly id: string
  readonly date: string
  readonly title: string
  readonly content: string
  readonly category: 'お知らせ' | '休診情報' | '募集'
}
