"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const setAudioData = () => {
      setDuration(audio.duration)
    }

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime)
    }

    // Events
    audio.addEventListener("loadeddata", setAudioData)
    audio.addEventListener("timeupdate", setAudioTime)
    audio.addEventListener("ended", () => setIsPlaying(false))

    return () => {
      audio.removeEventListener("loadeddata", setAudioData)
      audio.removeEventListener("timeupdate", setAudioTime)
      audio.removeEventListener("ended", () => setIsPlaying(false))
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted
    }
  }, [isMuted])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleProgressChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current) return

    const progressRect = progressRef.current.getBoundingClientRect()
    const percent = (e.clientX - progressRect.left) / progressRect.width
    audioRef.current.currentTime = percent * duration
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00"

    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <audio ref={audioRef} src="/audio.mp3" preload="metadata" />

      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-serif text-lg text-rose-800">Nuestra Canción</h3>
          <p className="text-rose-600 text-sm">Canción Especial</p>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleMute}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>

          <button
            onClick={togglePlay}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-rose-600 text-white hover:bg-rose-700 transition-colors"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
          </button>
        </div>
      </div>

      <div ref={progressRef} className="h-2 bg-rose-100 rounded-full cursor-pointer" onClick={handleProgressChange}>
        <div
          className="h-full bg-rose-500 rounded-full"
          style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
        ></div>
      </div>

      <div className="flex justify-between mt-2 text-xs text-rose-600">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  )
}
