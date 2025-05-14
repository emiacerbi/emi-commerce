"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

const carouselItems = [
  {
    id: 1,
    title: "Ofertas de Tecnología",
    description: "Hasta 40% de descuento en productos seleccionados",
    imageQuery: "/placeholder-images/carousel.png",
  },
  {
    id: 2,
    title: "Moda de Temporada",
    description: "Las últimas tendencias a precios increíbles",
    imageQuery: "/placeholder-images/carousel.png",
  },
  {
    id: 3,
    title: "Electrodomésticos",
    description: "Renueva tu hogar con las mejores marcas",
    imageQuery: "/placeholder-images/carousel.png",
  },
]

export default function MainCarousel() {
  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent(current => (current + 1) % carouselItems.length)
  }

  const prev = () => {
    setCurrent((current - 1 + carouselItems.length) % carouselItems.length)
  }

  useEffect(() => {
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {carouselItems.map((item) => (
          <div key={item.id} className="relative min-w-full">
            <Image
              src={item.imageQuery}
              alt={item.title}
              width={1200}
              height={400}
              className="h-[200px] w-full object-cover sm:h-[300px] md:h-[400px]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent p-6 flex flex-col justify-end">
              <h3 className="text-xl font-bold text-white md:text-2xl lg:text-3xl">{item.title}</h3>
              <p className="mt-2 text-sm text-white md:text-base">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        className="absolute grid place-content-center left-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white/80 text-black hover:bg-white/90"
        onClick={prev}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </button>

      <button
        className="absolute grid place-content-center right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white/80 text-black hover:bg-white/90"
        onClick={next}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {carouselItems.map((_, i) => (
          <button
            key={i}
            className={`h-2 w-2 rounded-full ${i === current ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrent(i)}
          >
            <span className="sr-only">Go to slide {i + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
