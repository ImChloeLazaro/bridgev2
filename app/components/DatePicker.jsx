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
  const handleDateChange = ({ index, setFunction }) => {
    console.log("INDEX INSIDE DATE PICKER", index);
    console.log("SET FUNCTION INSIDE DATE PICKER", setFunction);
  };

  const onValueChange =
    typeof onDateChange === "object" && onDateChange !== null
      ? handleDateChange(onDateChange)
      : onDateChange;

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
            console.log("INPUT HERE:", typeof date, date);

            onDateChange(text);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
