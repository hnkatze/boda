"use client"

import { useState, useEffect } from "react"

interface CountdownProps {
  targetDate: Date
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex justify-center space-x-4 md:space-x-8">
      <div className="flex flex-col items-center">
        <div className="bg-white/80 backdrop-blur-sm w-16 h-16 md:w-24 md:h-24 rounded-lg flex items-center justify-center shadow-md">
          <span className="font-serif text-2xl md:text-4xl text-rose-800">{timeLeft.days}</span>
        </div>
        <span className="text-rose-700 text-sm md:text-base mt-2">Días</span>
      </div>

      <div className="flex flex-col items-center">
        <div className="bg-white/80 backdrop-blur-sm w-16 h-16 md:w-24 md:h-24 rounded-lg flex items-center justify-center shadow-md">
          <span className="font-serif text-2xl md:text-4xl text-rose-800">{timeLeft.hours}</span>
        </div>
        <span className="text-rose-700 text-sm md:text-base mt-2">Horas</span>
      </div>

      <div className="flex flex-col items-center">
        <div className="bg-white/80 backdrop-blur-sm w-16 h-16 md:w-24 md:h-24 rounded-lg flex items-center justify-center shadow-md">
          <span className="font-serif text-2xl md:text-4xl text-rose-800">{timeLeft.minutes}</span>
        </div>
        <span className="text-rose-700 text-sm md:text-base mt-2">Minutos</span>
      </div>

      <div className="flex flex-col items-center">
        <div className="bg-white/80 backdrop-blur-sm w-16 h-16 md:w-24 md:h-24 rounded-lg flex items-center justify-center shadow-md">
          <span className="font-serif text-2xl md:text-4xl text-rose-800">{timeLeft.seconds}</span>
        </div>
        <span className="text-rose-700 text-sm md:text-base mt-2">Segundos</span>
      </div>
    </div>
  )
}
