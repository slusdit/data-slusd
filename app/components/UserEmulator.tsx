// components/UserEmulator.tsx
'use client'

import { Button } from "@/components/ui/button"
import { startEmulation, stopEmulation } from "@/lib/emulation"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function UserEmulator() {
  const router = useRouter()
  const [isEmulating, setIsEmulating] = useState(false)
  const [isPending, setIsPending] = useState(false)

  const handleStartEmulation = async () => {
    try {
      setIsPending(true)
      await startEmulation()
      setIsEmulating(true)
      toast.success('Now emulating user')
      router.refresh()
    } catch (error) {
      toast.error('Failed to start emulation')
      console.error('Failed to start emulation:', error)
    } finally {
      setIsPending(false)
    }
  }

  const handleStopEmulation = async () => {
    try {
      setIsPending(true)
      await stopEmulation()
      setIsEmulating(false)
      toast.success('Stopped emulating user')
      router.refresh()
    } catch (error) {
      toast.error('Failed to stop emulation')
      console.error('Failed to stop emulation:', error)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="flex gap-2">
      {!isEmulating ? (
        <Button 
          onClick={handleStartEmulation}
          variant="outline"
          className="bg-yellow-500 hover:bg-yellow-600 text-white"
          disabled={isPending}
        >
          {isPending ? 'Starting...' : 'Emulate User'}
        </Button>
      ) : (
        <Button 
          onClick={handleStopEmulation}
          variant="outline"
          className="bg-red-500 hover:bg-red-600 text-white"
          disabled={isPending}
        >
          {isPending ? 'Stopping...' : 'Stop Emulation'}
        </Button>
      )}
    </div>
  )
}