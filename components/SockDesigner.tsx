'use client'

import { useState } from 'react'
import { type SockConfig, DEFAULT_CONFIG } from '@/lib/patterns'
import Sock from '@/components/Sock'
import Controls from '@/components/Controls'

export default function SockDesigner() {
  const [config, setConfig] = useState<SockConfig>(DEFAULT_CONFIG)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl flex flex-col sm:flex-row gap-8 items-center sm:items-start">
        {/* Sock preview — wide aspect ratio matches viewBox 400×320 */}
        <div className="flex-shrink-0 w-72 h-56 sm:w-96 sm:h-72 drop-shadow-xl">
          <Sock config={config} />
        </div>

        {/* Controls */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 sm:p-8 min-w-0">
          <h1 className="text-2xl font-bold text-zinc-900 mb-1">
            Sockie Designer
          </h1>
          <p className="text-sm text-zinc-400 mb-6">
            design your perfect silly sock
          </p>
          <Controls config={config} onChange={setConfig} />
        </div>
      </div>
    </div>
  )
}
