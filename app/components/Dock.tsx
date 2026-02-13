"use client"

import { useRef } from "react"
import { dockApps } from "../constants"
import { Tooltip } from "react-tooltip"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

export default function Docker() {
  const dockRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    const dock = dockRef.current
    if (!dock) return

    const items = dock.querySelectorAll(".dock-item")

    const animateIcons = (mouseX: number) => {
      const dockRect = dock.getBoundingClientRect()

      items.forEach((item) => {
        const rect = item.getBoundingClientRect()
        const center = rect.left + rect.width / 2
        const distance = Math.abs(mouseX - center)

        const intensity = Math.exp(-(distance ** 2) / 3000)

        gsap.to(item, {
          scale: 1 + 0.5 * intensity,
          y: -25 * intensity,
          duration: 0.2,
          ease: "power2.out",
        })
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      animateIcons(e.clientX)
    }

    const handleMouseLeave = () => {
      gsap.to(items, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    dock.addEventListener("mousemove", handleMouseMove)
    dock.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove)
      dock.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const toggleApp = (app: { id: string; canOpen: boolean }) => {
    if (!app.canOpen) return
    console.log("Opening:", app.id)
  }

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id} className="dock-item relative flex justify-center">
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              disabled={!canOpen}
              onClick={() => toggleApp({ id, canOpen })}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
            >
              <img
                src={`/images/${icon}`}
                alt={name}
                className={`w-full h-full object-contain ${
                  !canOpen ? "opacity-60" : ""
                }`}
              />
            </button>
          </div>
        ))}

        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  )
}
