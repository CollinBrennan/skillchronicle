import { Timestamp } from 'firebase/firestore'

export type LogDocData = {
  skill: string
  seconds: number
  notes: string
  createdAt: Timestamp
  uid: string
}
