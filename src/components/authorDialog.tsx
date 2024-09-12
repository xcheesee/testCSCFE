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
    author?: Author
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
          <DialogContent className="bg-neutral-900 grid border-neutral-600 !rounded">
            <DialogHeader>
              <DialogTitle className="text-3xl">{author.name}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
                <div><span className="font-bold">Nascimento:</span> {author.country}</div>
                <div className="col-span-2 self-center justify-self-center font-bold">Biografia</div>
                <div className="col-span-2">{author.bio}</div>
            </div>
          </DialogContent>
        </Dialog>
    )
}