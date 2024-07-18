'use client'
import { Button } from '@/components/ui/button'


const RenewSchools = ({
    fecthFunction,
    buttonTitle = process.env.AERIES_API_KEY
}:{
    fecthFunction: () => void
    aeriesApiKey?: string
}) => {
    


    
    return (
        <Button
            onClick={() => fecthFunction()}
            >
            Renew Schools
        </Button>
    )
}

export default RenewSchools