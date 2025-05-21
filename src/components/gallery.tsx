"use client"

import { useState } from "react"
import { CldImage } from "next-cloudinary"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"

// Definimos las imágenes de la galería
const galleryImages = [
  {
    id: "boda/ux6rvbypqqbrvwq8evtk",
    alt: "Bryan y Genesis en el parque",
    width: 800,
    height: 600,
  },
  {
    id: "boda/cbqtdvdhlb4vnedwu2rx",
    alt: "Bryan y Genesis en la playa",
    width: 800,
    height: 600,
  },
  {
    id: "boda/qcrfff6yuzbhdjrtzs1z",
    alt: "Bryan y Genesis en una cena",
    width: 800,
    height: 600,
  },
  {
    id: "boda/zkklehenoq3ov2ilnoaf",
    alt: "Bryan y Genesis en un viaje",
    width: 800,
    height: 600,
  },
  {
    id: "boda/gmablgxm5n5bho6gbzm3",
    alt: "Bryan y Genesis en una fiesta",
    width: 800,
    height: 600,
  },
  {
    id: "boda/vkkmh9xryk9vdp2msuv3",
    alt: "Bryan y Genesis en un atardecer",
    width: 800,
    height: 600,
  },
]

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const openLightbox = (imageId: string) => {
    setSelectedImage(imageId)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {galleryImages.map((image) => (
          <div
            key={image.id}
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => openLightbox(image.id)}
          >
            <CldImage
              src={image.id}
              alt={image.alt}
              width={400}
              height={400}
              crop="fill"
              gravity="auto"
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          <button
            onClick={closeLightbox}
            className="absolute top-2 right-2 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
          >
            <X size={24} />
          </button>
          {selectedImage && (
            <div className="w-full h-full flex items-center justify-center">
              <CldImage
                src={selectedImage}
                alt="Imagen ampliada"
                width={1200}
                height={800}
                crop="limit"
                className="max-h-[80vh] rounded-lg"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
