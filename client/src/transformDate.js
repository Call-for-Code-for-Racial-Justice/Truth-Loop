export default function transformDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: '2-digit' }
  const date = new Date(dateString)
  return date.toLocaleDateString(undefined, options)
}
