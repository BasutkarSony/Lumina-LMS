export function extractYoutubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/,
    /^([\w-]{11})$/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match?.[1]) return match[1]
  }
  return null
}

export function getYoutubeEmbedUrl(url: string): string {
  const id = extractYoutubeId(url)
  if (!id) return ""
  return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`
}
