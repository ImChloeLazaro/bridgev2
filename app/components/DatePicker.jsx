import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

export function DatePicker({ date, onDateChange }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          size="icon"
          className={cn("px-2 justify-center text-left font-normal")}
        >
          {/* {date ? onValueChange(format(date, "PP")) : onValueChange("")} */}
          <CalendarIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(text) => {
            console.log("INPUT HERE:", typeof text, text);

            onDateChange(format(text, "LLLL d, y"));
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
