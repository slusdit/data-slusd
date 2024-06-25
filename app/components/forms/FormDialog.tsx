'use client'
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";

export default function FormDialog({
    children,
    triggerMessage,
    title,
    icon
}: {
    children: React.ReactNode
    triggerMessage?: string
    title?: string
    icon?: React.ReactNode
}) {

    const [open, setOpen] = useState(false)

    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button>
                    {triggerMessage ?? 'Open'}
                    {icon}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>{title ?? ''}</DialogTitle>
                {children}
                <DialogFooter className="justify-start">

                    <DialogClose asChild>
                        <Button type="button" variant="link">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}