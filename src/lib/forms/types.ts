import type { TopicId } from '../../data/services'

export interface Specimen {
  key: string
  tag: string
  castDate: string
  ageDays: string
  strengthClass: string
}

export interface QuoteRequest {
  topic: TopicId | ''
  name: string
  company: string
  phone: string
  email: string
  location: string
  timing: string
  message: string
  /** kuntotarkastus */
  buildYear: string
  /** kosteusmittaus */
  propertyType: '' | 'huoneisto' | 'pientalo'
  /** betonin kosteusmittaus */
  points: string
  /** laboratorio (fields of the official order form) */
  billingRef: string
  distribution: string
  moulds: boolean
  specimens: Specimen[]
  /** honeypot – must stay empty */
  website: string
}

export type FieldKey =
  | 'topic'
  | 'name'
  | 'phone'
  | 'email'
  | 'contact'
  | 'location'
  | 'message'
  | 'buildYear'
  | 'points'
  | 'specimens'

export type FieldErrors = Partial<Record<FieldKey, string>>

export interface SubmitResult {
  ok: boolean
  demo: boolean
  message: string
}

export interface FormAdapter {
  submit(data: QuoteRequest): Promise<SubmitResult>
}

let n = 0
export const newSpecimen = (): Specimen => ({ key: `k${Date.now().toString(36)}${n++}`, tag: '', castDate: '', ageDays: '28', strengthClass: '' })

export const emptyRequest = (): QuoteRequest => ({
  topic: '',
  name: '',
  company: '',
  phone: '',
  email: '',
  location: '',
  timing: '',
  message: '',
  buildYear: '',
  propertyType: '',
  points: '',
  billingRef: '',
  distribution: '',
  moulds: false,
  specimens: [],
  website: '',
})
