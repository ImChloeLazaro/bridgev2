import { Select, SelectItem } from "@nextui-org/react";
const Recurrence = ({handleRecurrence}) => {
    const data = [
        { label: "No Repeat", value: "NOREPEAT", description: "Set this meeting without recursion" },
        { label: "DAILY", value: "DAILY", description: "DAILY Meeting" },
        { label: "Weekly", value: "WEEKLY", description: "Schedule meeting weekly" },
        { label: "Monthly", value: "MONTHLY", description: "Schedule monthly meeting" },
        { label: "Yearly", value: "Yearly", description: "Schedule yearly meeting" }
    ]

    return (
        <Select
            label="Select Recurrence"
            className="w-full"
            onChange={(e) => handleRecurrence(e.target.value)}
        >
            {data.map((res) => (
                <SelectItem key={res.value} value={res.value}>
                    {res.label}
                </SelectItem>
            ))}
        </Select>
    )
}
export default Recurrence;