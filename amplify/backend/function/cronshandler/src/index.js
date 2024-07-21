const mongoose = require("mongoose");
const {
  differenceInDays,
  differenceInMonths,
  differenceInQuarters,
  differenceInWeeks,
  differenceInYears,
  formatISO,
  addDays,
  addWeeks,
  addMonths,
  addQuarters,
  addYears,
} = require("date-fns");
const { parseZonedDateTime } = require("@internationalized/date");
const taskModel = require("/opt/schema/cmsTaskSchema.js");
const itemModel = require("/opt/schema/itemSchema.js");
mongoose.connect(process.env.DATABASE);

exports.handler = async (event) => {
  try {
    const tasks = await taskModel.find();
    // const dailyTasks = tasks
    //   .filter(
    //     (task) =>
    //       task.sla &&
    //       task.sla.some((s) => s.duration && s.duration.recurrence === "daily")
    //   )
    //   .map((task) => ({
    //     manager: task.manager,
    //     client: task.client,
    //     processor: task.processor,
    //     reviewer: task.reviewer,
    //     sla: task.sla.filter(
    //       (s) => s.duration && s.duration.recurrence === "daily"
    //     ),
    //   }));
    // console.log("dailyTasks", dailyTasks);

    // console.log("tasks", tasks);

    // const item = await itemModel.create(dailyTasks);

    const convertedTasks = tasks.map((task) => {
      const updatedEndDateTime = task.sla.map((sla) => {
        // Add validation for weekends and holidays (array lookup)
        if (sla.status === "done") {
          console.log("sla.duration.end", sla.duration.end);

          switch (sla.duration.recurrence) {
            case "daily":
              let differenceDays = differenceInDays(
                new Date(),
                new Date(sla.duration.end)
              );
              console.log("difference daily", differenceDays);

              if (differenceDays >= 1) {
                return {
                  _id: sla._id,
                  name: sla.name,
                  instruction: sla.instruction,
                  status: sla.status,
                  progress: sla.progress,
                  escalate: sla.escalate,
                  duration: {
                    start: sla.duration.start,
                    end: formatISO(addDays(new Date(sla.duration.end), 1)),
                    recurrence: sla.duration.recurrence,
                  },
                  done_by: sla.done_by,
                };
              } else {
                return {
                  _id: sla._id,
                  name: sla.name,
                  instruction: sla.instruction,
                  status: sla.status,
                  progress: sla.progress,
                  escalate: sla.escalate,
                  duration: sla.duration,
                  done_by: sla.done_by,
                };
              }
            case "weekly":
              let differenceWeeks = differenceInWeeks(
                new Date(),
                new Date(sla.duration.end)
              );
              console.log("difference weekly", differenceWeeks);

              if (differenceWeeks >= 1) {
                return {
                  _id: sla._id,
                  name: sla.name,
                  instruction: sla.instruction,
                  status: sla.status,
                  progress: sla.progress,
                  escalate: sla.escalate,
                  duration: {
                    start: sla.duration.start,
                    end: formatISO(addWeeks(new Date(sla.duration.end), 1)),
                    recurrence: sla.duration.recurrence,
                  },
                  done_by: sla.done_by,
                };
              } else {
                return {
                  _id: sla._id,
                  name: sla.name,
                  instruction: sla.instruction,
                  status: sla.status,
                  progress: sla.progress,
                  escalate: sla.escalate,
                  duration: sla.duration,
                  done_by: sla.done_by,
                };
              }
            case "monthly":
              let differenceMonthly = differenceInMonths(
                new Date(),
                new Date(sla.duration.end)
              );
              console.log("difference monthly", differenceMonthly);

              if (differenceMonthly >= 1) {
                return {
                  _id: sla._id,
                  name: sla.name,
                  instruction: sla.instruction,
                  status: sla.status,
                  progress: sla.progress,
                  escalate: sla.escalate,
                  duration: {
                    start: sla.duration.start,
                    end: formatISO(addMonths(new Date(sla.duration.end), 1)),
                    recurrence: sla.duration.recurrence,
                  },
                  done_by: sla.done_by,
                };
              } else {
                return {
                  _id: sla._id,
                  name: sla.name,
                  instruction: sla.instruction,
                  status: sla.status,
                  progress: sla.progress,
                  escalate: sla.escalate,
                  duration: sla.duration,
                  done_by: sla.done_by,
                };
              }
            case "quarterly":
              let differenceQuarterly = differenceInQuarters(
                new Date(),
                new Date(sla.duration.end)
              );
              console.log("difference quarterly", differenceQuarterly);

              if (differenceQuarterly >= 1) {
                return {
                  _id: sla._id,
                  name: sla.name,
                  instruction: sla.instruction,
                  status: sla.status,
                  progress: sla.progress,
                  escalate: sla.escalate,
                  duration: {
                    start: sla.duration.start,
                    end: formatISO(addQuarters(new Date(sla.duration.end), 1)),
                    recurrence: sla.duration.recurrence,
                  },
                  done_by: sla.done_by,
                };
              } else {
                return {
                  _id: sla._id,
                  name: sla.name,
                  instruction: sla.instruction,
                  status: sla.status,
                  progress: sla.progress,
                  escalate: sla.escalate,
                  duration: sla.duration,
                  done_by: sla.done_by,
                };
              }
            case "yearly":
              let differenceYears = differenceInYears(
                new Date(),
                new Date(sla.duration.end)
              );
              console.log("difference yearly", differenceYears);

              if (differenceYears >= 1) {
                return {
                  _id: sla._id,
                  name: sla.name,
                  instruction: sla.instruction,
                  status: sla.status,
                  progress: sla.progress,
                  escalate: sla.escalate,
                  duration: {
                    start: sla.duration.start,
                    end: formatISO(addYears(new Date(sla.duration.end), 1)),
                    recurrence: sla.duration.recurrence,
                  },
                  done_by: sla.done_by,
                };
              } else {
                return {
                  _id: sla._id,
                  name: sla.name,
                  instruction: sla.instruction,
                  status: sla.status,
                  progress: sla.progress,
                  escalate: sla.escalate,
                  duration: sla.duration,
                  done_by: sla.done_by,
                };
              }
            default:
              return {
                _id: sla._id,
                name: sla.name,
                instruction: sla.instruction,
                status: sla.status,
                progress: sla.progress,
                escalate: sla.escalate,
                duration: sla.duration,
                done_by: sla.done_by,
              };
          }
        } else {
          return {
            _id: sla._id,
            name: sla.name,
            instruction: sla.instruction,
            status: sla.status,
            progress: sla.progress,
            escalate: sla.escalate,
            duration: sla.duration,
            done_by: sla.done_by,
          };
        }
      });
      console.log("updatedEndDateTime", updatedEndDateTime);
      return {
        _id: task._id,
        manager: task.manager,
        client: task.client,
        processor: task.processor,
        reviewer: task.reviewer,
        sla: updatedEndDateTime,
      };
    });

    const responseAll = await Promise.all(
      convertedTasks.map(async (task) => {
        const { _id, manager, client, processor, reviewer, sla } = task;
        console.log("sla", sla);
        try {
          const response = await taskModel.updateOne(
            { _id },
            { _id, manager, client, processor, reviewer, sla }
          );
          return true;
        } catch (error) {
          return false;
        }
      })
    );
    console.log("RESPONSE FROM UPDATING RECURRENCE", responseAll);

    const resetDone = await taskModel.updateMany(
      {},
      { $set: { "sla.$[elem].status": "todo" } },
      {
        arrayFilters: [{ "elem.status": { $eq: "done" } }],
      }
    );

    console.log("RESET DONE TO TODO");

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, response: responseAll }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
