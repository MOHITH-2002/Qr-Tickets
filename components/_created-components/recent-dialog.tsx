import React from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import Recent from "./recents"
import Ticket  from "@/types"

interface RecentDialogProps {
  tickets: Ticket[]
}

export function RecentDialog({ tickets }: RecentDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <HistoryIcon className="h-5 w-5" />
          <span className="sr-only">View recent tickets</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[400px] rounded-lg pt-5">
        <Recent tickets={tickets} />
      </DialogContent>
    </Dialog>
  )
}

export function HistoryIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 4H22V20H2V4ZM4 6V18H20V6H4Z"
        fill="currentColor"
      />
      <circle
        cx="12"
        cy="12"
        r="5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 9V12L14 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 3V5M19 3V5M5 19V21M19 19V21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

