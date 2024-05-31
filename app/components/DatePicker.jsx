import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import IconButton from "./IconButton";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";

export function DatePicker({
  date,
  onDateChange,
  isOpen,
  onOpen,
  onOpenChange,
  isDateModal = false,
}) {
  return isDateModal ? (
    <>
      <IconButton onPress={onOpen}>
        <CalendarIcon className="h-4 w-4" />
      </IconButton>
      <Modal
        size={"xs"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop={"transparent"}
        placement={"bottom"}
        classNames={{ base: "text-clip", closeButton: "hidden", wrapper: "" }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(text) => {
                    onDateChange(text);
                  }}
                  initialFocus
                  classNames={{}}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  ) : (
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
            onDateChange(format(text, "LLLL d, y"));
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
