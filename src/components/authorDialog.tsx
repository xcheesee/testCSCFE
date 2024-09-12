import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Author } from "@/types/types"
import { Dispatch, SetStateAction } from "react"

export default function AuthorDialog({
    author,
    open,
    setOpen,
    onClose,
}: {
    author: Author
    open?: boolean,
    setOpen?: Dispatch<SetStateAction<boolean>>,
    onClose?: () => void,
}) {
    if(!author) return
    return (
        <Dialog open={open} onOpenChange={() => {
            if(setOpen) setOpen(prev => !prev)
            if(onClose) onClose()
            }}>
          <DialogContent className="bg-neutral-900 grid gap-8">
            <DialogHeader>
              <DialogTitle>{author.name}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2">
                <div>Nascimento: {author.country}</div>
                <div className="col-span-2">Biografia: {author.bio}</div>
            </div>
          </DialogContent>
        </Dialog>
    )
}