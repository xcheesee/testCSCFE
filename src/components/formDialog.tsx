import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Dispatch, ReactNode, SetStateAction } from "react"

export default function FormDialog({
    action,
    open,
    setOpen,
    children
}: {
    action: string,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    children: ReactNode
}) {
    return (
        <Dialog open={open} onOpenChange={() => setOpen(prev => !prev)}>
          <DialogContent className="bg-neutral-900 grid gap-8">
            <DialogHeader>
              <DialogTitle>{action} Livro</DialogTitle>
            </DialogHeader>
            { children }
          </DialogContent>
        </Dialog>
    )
}