import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { HistoryIcon } from "lucide-react"
import Recent from "./recents"
import Ticket from "@/types"
interface props {
    tickets:Ticket[] |any
}
export function RecentDialog({tickets}:props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size='icon' className=" bg-slate-50 
        rounded-full p-1">
            <HistoryIcon/>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[400px] rounded-lg pt-5">
        <Recent tickets={tickets}/>
      </DialogContent>
    </Dialog>
  )
}
