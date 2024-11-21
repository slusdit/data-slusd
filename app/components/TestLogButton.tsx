'use client'

import { Button } from "@/components/ui/button"

const TestLogButton = (data:any) => {
    return (
        <Button
            onClick={() => {
                console.log(data)
            }}
        >
            Log
        </Button>
    )
}

export default TestLogButton