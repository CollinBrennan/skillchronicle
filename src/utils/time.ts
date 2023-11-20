export function timeFromSeconds(totalSeconds: number) {
  var remainingSeconds = totalSeconds
  const hours = Math.floor(remainingSeconds / 3600)
  remainingSeconds -= hours * 3600
  const minutes = Math.floor(remainingSeconds / 60) % 60
  remainingSeconds -= minutes * 60
  return { hours: hours, minutes: minutes, seconds: remainingSeconds }
}
