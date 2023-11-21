export function capitalize(string: string) {
  if (string.length === 0) return ''

  const firstLetter = string.charAt(0).toUpperCase()
  const restOfString = string.substring(1)

  return firstLetter + restOfString
}
