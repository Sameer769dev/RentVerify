import Image from "next/image"

export default function MapPlaceholder() {
  return (
    <div className="sticky top-16 h-[calc(100vh-4rem)] w-full">
      <Image 
        src="https://placehold.co/800x1200.png"
        alt="Map of listings"
        fill
        style={{ objectFit: 'cover' }}
        data-ai-hint="city map"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
    </div>
  )
}
