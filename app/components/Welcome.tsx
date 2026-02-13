"use client"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"

const FONT_WEIGHT = {
  subtitle: { min: 200, max: 500, default: 300 },
  title: { min: 400, max: 900, default: 500 }
} as const

const renderText = (text: string, className: string, baseWeight: number) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ))
}

const setupTextHover = (container: HTMLElement | null, type: keyof typeof FONT_WEIGHT) => {
  if (!container) return

  const letters = container.querySelectorAll("span")
  const { min, max, default: base } = FONT_WEIGHT[type]

  const animateLetter = (letter: Element, weight: number) => {
    gsap.to(letter, {
      duration: 0.3,
      ease: "power2.out",
      fontVariationSettings: `'wght' ${weight}`
    })
  }

  const handleMouseMove = (e: MouseEvent) => {
    const { left } = container.getBoundingClientRect()
    const mouseX = e.clientX - left

    letters.forEach(letter => {
      const rect = letter.getBoundingClientRect()
      const center = rect.left - left + rect.width / 2
      const distance = Math.abs(mouseX - center)

      const intensity = Math.exp(-(distance ** 2) / 2000)
      const weight = min + (max - min) * intensity

      animateLetter(letter, weight)
    })
  }

  const handleLeave = () => {
    letters.forEach(letter => animateLetter(letter, base))
  }

  container.addEventListener("mousemove", handleMouseMove)
  container.addEventListener("mouseleave", handleLeave)
}

export default function Welcome() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    setupTextHover(titleRef.current, "title")
    setupTextHover(subtitleRef.current, "subtitle")
  })

  return (
    <section id="welcome" className="h-screen flex flex-col justify-center items-center">
      <p ref={subtitleRef}>
        {renderText("Hey, I am Avansh! Welcome to my", "text-3xl", 300)}
      </p>

      <h1 ref={titleRef} className="mt-6">
        {renderText("portfolio", "text-8xl italic", 500)}
      </h1>
    </section>
  )
}
