
import { Tooltip, Button } from "@nextui-org/react";

const Reaction = ({isSelected, reactionList, reacted}) => {
  return (
    <Button
    size="lg"
    disableRipple
    disableAnimation
    className="bg-transparent"
    onPress={() => {
      handleAddReaction(selectedReacted);
    }}
    startContent={
      <div className="text-darkgrey-default">
        {reactionList?.length
          ? reacted
            ? reactionIcons[selectedReacted]?.active
            : reactionIcons[selectedReacted]?.inactive
          : reacted
          ? reactionIcons.star.active
          : reactionIcons.star.inactive}
      </div>
    }
  >
    <p
      className={`${
        reacted
          ? `${label[selectedReacted]?.color}`
          : "font-semibold text-darkgrey-default capitalize"
      }`}
    >
      {label[selectedReacted]?.label}
    </p>
  </Button>
  )
}

export default Reaction