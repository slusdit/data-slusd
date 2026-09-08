"use client";

/**
 * Accessible replacement for window.confirm on destructive admin actions
 * (finding U8). When `confirmText` is given the user must type it before the
 * destructive button enables (used for bulk and user deletes).
 */
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface ConfirmDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: React.ReactNode;
  /** text the user must type exactly to enable the action */
  confirmText?: string;
  actionLabel?: string;
  pending?: boolean;
  onConfirm: () => void | Promise<void>;
}

export default function ConfirmDeleteDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText,
  actionLabel = "Delete",
  pending = false,
  onConfirm,
}: ConfirmDeleteDialogProps) {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    if (!open) setTyped("");
  }, [open]);

  const ready = !confirmText || typed.trim() === confirmText;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-3">
              <div>{description}</div>
              {confirmText && (
                <div className="space-y-1.5">
                  <Label htmlFor="confirm-delete-input">
                    Type <span className="font-mono font-semibold">{confirmText}</span> to confirm
                  </Label>
                  <Input
                    id="confirm-delete-input"
                    value={typed}
                    onChange={(e) => setTyped(e.target.value)}
                    autoComplete="off"
                    autoFocus
                  />
                </div>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={!ready || pending}
            onClick={(e) => {
              e.preventDefault();
              void onConfirm();
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {pending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
