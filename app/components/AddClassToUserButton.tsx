'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { syncTeacherClasses } from "@/lib/signinMiddleware"
import { Plus } from "lucide-react"
import { useState } from "react"

const AddClassToUserButton = ({
    profileId
}:{
    profileId: string
}) => {
    const [email, setEmail] = useState('')
    return (
        <div
            className="max-w-xs "
        >
            <div className="flex space-x-2 p-2 ">
                <Label htmlFor="add-user-class-email">Add Teacher&apos;s Classes</Label>
                <Input
                    type="email"
                    name="add-user-class-email"
                    id="add-user-class-email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                    type="submit"
                    onClick={() => syncTeacherClasses(profileId, email)}
                >Add <Plus className="w-4 h-4" /></Button>
            </div>
        </div>
    )
}

export default AddClassToUserButton