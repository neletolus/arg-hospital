export interface PatientReview {
  readonly id: string
  readonly name: string
  readonly age: string
  readonly rating: 1 | 2 | 3 | 4 | 5
  readonly date: string
  readonly comment: string
  readonly service: string
}
