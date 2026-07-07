'use client'
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { createContext, useContext, useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";

// Lets any child form close the dialog after a successful submit.
const FormDialogContext = createContext<{ close: () => void }>({ close: () => {} });
export function useFormDialog() {
    return useContext(FormDialogContext);
}

export default function FormDialog({
    children,
    triggerMessage,
    title,
    icon,
    className = 'w-3xl'
}: {
    children: React.ReactNode
    triggerMessage?: string
    title?: string
    icon?: React.ReactNode
    className?: string
}) {

    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    {triggerMessage ?? 'Open'}
                    {icon}
                </Button>
            </DialogTrigger>
            <DialogContent className={className}>
                <DialogTitle>{title ?? ''}</DialogTitle>
                <FormDialogContext.Provider value={{ close: () => setOpen(false) }}>
                    {children}
                </FormDialogContext.Provider>
                <DialogFooter>
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
