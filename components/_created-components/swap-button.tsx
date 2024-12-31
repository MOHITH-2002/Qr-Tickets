import { Button } from "@/components/ui/button"
import { ArrowUpDown } from 'lucide-react'

interface SwapButtonProps {
  onClick: () => void
}

export function SwapButton({ onClick }: SwapButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full"
      onClick={onClick}
    >
      <ArrowUpDown className="h-4 w-4" />
    </Button>
  )
}

