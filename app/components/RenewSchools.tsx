'use client'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

const RenewSchools = ({
    fecthFunction,
    buttonTitle = 'Renew Schools',
}: {
    fecthFunction: () => void | Promise<void>
    buttonTitle?: string
}) => {
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = async () => {
        setIsLoading(true)
        try {
            await fecthFunction()
            toast.success('Schools renewed.')
        } catch (error) {
            console.error('Failed to renew schools:', error)
            toast.error('Failed to renew schools. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button onClick={handleClick} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {buttonTitle}
        </Button>
    )
}

export default RenewSchools
