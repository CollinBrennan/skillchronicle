import dayjs from 'dayjs'
import { Timestamp } from 'firebase/firestore'

export function timeFromSeconds(totalSeconds: number) {
  var remainingSeconds = totalSeconds

  const hours = Math.floor(remainingSeconds / 3600)
  remainingSeconds %= 3600

  const minutes = Math.floor(remainingSeconds / 60)
  remainingSeconds %= 60

  return { hours: hours, minutes: minutes, seconds: remainingSeconds }
}

export function getCalendarDate() {
  const date = dayjs().format('dddd, MMMM DD, YYYY')
  return date
}

export function getFormattedTime(totalSeconds: number) {
  const { hours, minutes } = timeFromSeconds(totalSeconds)
  const formattedMinutes = minutes < 10 ? '0' + minutes.toString() : minutes
  return `${hours}:${formattedMinutes}`
}

export function getFormattedDate(timestamp: Timestamp) {
  return dayjs(timestamp.toDate()).format('DD/MM/YYYY')
}
