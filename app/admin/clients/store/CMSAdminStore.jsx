import {
  clientSelectionForTaskAtom,
  managerSelectionAtom,
  processorSelectionAtom,
  reviewerSelectionAtom,
  tasksAtom,
} from "@/app/store/TaskStore";
import { atom } from "jotai";
import { addDays } from "date-fns";

export const changeViewAtom = atom(false);
export const showClientTaskAtom = atom(false);
export const showFooterAtom = atom(true);
export const showSearchBarAtom = atom(true);

export const selectedClientToViewAtom = atom("");
export const selectedClientFilterKeysAtom = atom(new Set(["all"]));
export const selectedTaskFilterKeysAtom = atom(new Set(["all"]));
export const showClientDetailsAtom = atom(false);

let pageRowIndex = 0;
export const pageRowsSelectionAtom = atom([
  {
    key: `pageRow-${(pageRowIndex += 1)}`,
    label: "10",
    value: "10",
  },
  {
    key: `pageRow-${(pageRowIndex += 1)}`,
    label: "20",
    value: "20",
  },
  {
    key: `pageRow-${(pageRowIndex += 1)}`,
    label: "50",
    value: "50",
  },
  {
    key: `pageRow-${(pageRowIndex += 1)}`,
    label: "100",
    value: "100",
  },
  {
    key: `pageRow-${(pageRowIndex += 1)}`,
    label: "200",
    value: "200",
  },
]);

export const selectedPage = atom(1);

// TASK ESSENTIALS

export const selectedClientForTaskAtom = atom(new Set([]));
export const selectedProcessorAtom = atom(new Set([]));
export const selectedReviewerAtom = atom(new Set([]));
export const selectedManagerAtom = atom(new Set([]));
export const selectedRecurrenceAtom = atom(new Set(["Daily"]));

export const startDateAtom = atom("");
export const endDateAtom = atom("");

export const startTimeAtom = atom("");
export const endTimeAtom = atom("");

export const taskNameAtom = atom("");
export const taskInstructionAtom = atom("");

export const taskDataAtom = atom((get) => {
  const selectedClientForTask = get(selectedClientForTaskAtom);
  const selectedProcessor = get(selectedProcessorAtom);
  const selectedReviewer = get(selectedReviewerAtom);
  const selectedManager = get(selectedManagerAtom);
  const selectedRecurrence = get(selectedRecurrenceAtom);

  const clientSelection = get(clientSelectionForTaskAtom);
  const processorSelection = get(processorSelectionAtom);
  const reviewerSelection = get(reviewerSelectionAtom);
  const managerSelection = get(managerSelectionAtom);

  return {
    manager: managerSelection.filter((manager) =>
      Array.from(selectedManager).includes(manager.sub)
    )[0],
    client: clientSelection.filter((client) =>
      Array.from(selectedClientForTask).includes(client.client_id)
    )[0],
    processor: processorSelection.filter((processor) =>
      Array.from(selectedProcessor).includes(processor.sub)
    ),
    reviewer: reviewerSelection.filter((reviewer) =>
      Array.from(selectedReviewer).includes(reviewer.sub)
    ),
    // duration: Array.from(selectedRecurrence).join(""), //Daily, Weekly, Monthly, Quarterly, Yearly
    sla: [
      {
        name: get(taskNameAtom) === "" ? "Task Name" : get(taskNameAtom),
        instruction:
          get(taskInstructionAtom) === ""
            ? "Add Instructions"
            : get(taskInstructionAtom),
        status: "todo", //todo, pending, to review, done
        progress: "Good", //Good, Overdue, Adhoc
        duration: {
          start: get(startDateAtom) === "" ? new Date() : get(startDateAtom),
          end:
            get(endDateAtom) === "" ? addDays(new Date(), 1) : get(endDateAtom),
          recurrence:
            Array.from(selectedRecurrence).join("") === ""
              ? "Daily"
              : Array.from(selectedRecurrence).join(""),
        },
        // done_by: {
        //   sub: String,
        //   name: String,
        //   email: String,
        //   picture: String,
        // }, //sub
      },
    ],
  };
});

// CLIENT ESSENTIALS

export const clientSelectionChangeAtom = atom(null, (get, set, update) => {
  const { key } = update;
  console.log("SELECTION KEY", key);
  const clientSelectionChange = get(tasksAtom).filter(
    (task) => task.client.client_id === key
  );
  if (clientSelectionChange?.length) {
    console.log("clientSelectionChange: ", clientSelectionChange);
    const selectedClient = [clientSelectionChange[0].client.client_id];
    const selectedProcessor = clientSelectionChange[0].processor.map(
      (processor) => processor.sub
    );
    const selectedReviewer = clientSelectionChange[0].reviewer.map(
      (reviewer) => reviewer.sub
    );
    const selectedManager = [clientSelectionChange[0].manager.sub];

    set(selectedClientForTaskAtom, new Set(selectedClient));
    set(selectedProcessorAtom, new Set(selectedProcessor));
    set(selectedReviewerAtom, new Set(selectedReviewer));
    set(selectedManagerAtom, new Set(selectedManager));
  } else {
    set(selectedProcessorAtom, new Set([]));
    set(selectedReviewerAtom, new Set([]));
    set(selectedManagerAtom, new Set([]));
  }
});
