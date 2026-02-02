'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { syncTeacherClasses } from "@/lib/signinMiddleware"
import { Plus, Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const AddClassToUserButton = ({
    profileId
}:{
    profileId: string
}) => {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleAddClasses = async () => {
        if (!email.trim()) {
            toast.error("Please enter an email address")
            return
        }

        setIsLoading(true)
        try {
            await syncTeacherClasses(profileId, email)
            toast.success("Classes synced successfully")
            setEmail('')
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error"
            toast.error(`Failed to sync classes: ${errorMessage}. Please verify the email address belongs to a teacher and try again.`)
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

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
                    disabled={isLoading}
                />
                <Button
                    type="submit"
                    onClick={handleAddClasses}
                    disabled={isLoading || !email.trim()}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                            Syncing...
                        </>
                    ) : (
                        <>
                            Add <Plus className="w-4 h-4 ml-1" />
                        </>
                    )}
                </Button>
            </div>
        </div>
    )
}

export default AddClassToUserButton