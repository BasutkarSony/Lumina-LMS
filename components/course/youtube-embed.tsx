"use client"

import { getYoutubeEmbedUrl } from "@/lib/youtube"

interface YoutubeEmbedProps {
  url: string
  title: string
}

export function YoutubeEmbed({ url, title }: YoutubeEmbedProps) {
  const embedUrl = getYoutubeEmbedUrl(url)
  if (!embedUrl) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
        Video unavailable
      </div>
    )
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-lg border border-border/80 bg-black">
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  )
}
