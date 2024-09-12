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
    onClose,
    children
}: {
    action: string,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    onClose?: () => void,
    children: ReactNode
}) {
    return (
        <Dialog open={open} onOpenChange={() => {
            setOpen(prev => !prev)
            if(onClose) onClose()
            }}>
          <DialogContent className="bg-neutral-900 grid gap-8 border-neutral-600 !rounded">
            <DialogHeader>
              <DialogTitle>{action} Livro</DialogTitle>
            </DialogHeader>
            { children }
          </DialogContent>
        </Dialog>
    )
}