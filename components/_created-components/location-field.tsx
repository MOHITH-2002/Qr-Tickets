import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LocationFieldProps {
  label: string
  value: string
  onClick: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function LocationField({ label, value, onClick, onChange }: LocationFieldProps) {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={label}>{label}</Label>
      <Input
        type="text"
        id={label}
        placeholder={`Enter ${label.toLowerCase()}`}
        value={value}
        onClick={onClick}
        onChange={onChange}
        className="rounded-md h-[50px] md:h-[40px]"
      />
    </div>
  )
}

