export interface OperatingHours {
  readonly day: string
  readonly morning: string | null
  readonly afternoon: string | null
}

export interface ClinicInfo {
  readonly name: string
  readonly nameKana: string
  readonly postalCode: string
  readonly address: string
  readonly phone: string
  readonly fax: string
  readonly hours: readonly OperatingHours[]
  readonly closedDays: string
  readonly parking: string
  readonly coordinates: {
    readonly lat: number
    readonly lng: number
  }
}
