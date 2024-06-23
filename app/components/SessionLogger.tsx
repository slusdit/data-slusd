"use client"

import { Button } from "@/components/ui/button"

export default function SessionLogger(
    {
        session
    }: {
        session: any
    }
) {
    return (<Button
        onClick={() => {
            console.log( session )
        }}
    > Click to log session

    </Button>)
}