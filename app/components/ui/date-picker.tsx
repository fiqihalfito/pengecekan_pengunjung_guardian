

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Label } from "~/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover"
import { Calendar } from "./calendar"

type DatePickerProp = {
    name: string,
    date: Date | undefined,
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}

export function DatePicker({ name, date, setDate }: DatePickerProp) {
    const [open, setOpen] = React.useState(false)

    return (
        <div className="flex flex-col gap-3">
            <Label htmlFor={name} className="px-1">
                Tanggal Lahir
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id={name}
                        className="w-48 justify-between font-normal"
                    >
                        {date ? date.toLocaleDateString() : "pilih tanggal lahir"}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            setDate(date)
                            setOpen(false)
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
