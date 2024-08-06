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
  isWeekend,
  nextMonday,
} = require("date-fns");
const taskModel = require("/opt/schema/cmsTaskSchema.js");
mongoose.connect(process.env.DATABASE);

exports.handler = async (event) => {
  try {
    const tasks = await taskModel.find();
    const holidaysAU2024 = [
      "2024-01-02T00:00:00+11:00",
      "2024-01-27T00:00:00+11:00",
      "2024-03-30T00:00:00+11:00",
      "2024-03-31T00:00:00+11:00",
      "2024-04-01T00:00:00+11:00",
      "2024-04-02T00:00:00+11:00",
      "2024-04-26T00:00:00+10:00",
      "2024-06-11T00:00:00+10:00",
      "2024-10-08T00:00:00+11:00",
      "2024-12-26T00:00:00+11:00",
      "2024-12-27T00:00:00+11:00",
    ];
    const convertedTasks = tasks.map((task) => {
      const updatedEndDateTime = task.sla.map((sla) => {
        // Add validation for weekends and holidays (array lookup)
        if (sla.status === "done") {
          switch (sla.duration.recurrence) {
            case "daily":
              let differenceDays = differenceInDays(
                new Date(),
                new Date(sla.duration.end.toString().slice(0, -1))
              );

              if (differenceDays >= 1) {
                let newDueTime = addDays(
                  new Date(sla.duration.end.toString().slice(0, -1)),
                  differenceDays
                );

                if (holidaysAU2024.includes(formatISO(newDueTime))) {
                  newDueTime = addDays(
                    new Date(sla.duration.end.toString().slice(0, -1)),
                    2
                  );
                }

                if (isWeekend(newDueTime)) {
                  newDueTime = nextMonday(
                    new Date(sla.duration.end.toString().slice(0, -1)),
                    1
                  );
                }

                return {
                  _id: sla._id,
                  name: sla.name,
                  instruction: sla.instruction,
                  status: sla.status,
                  progress: sla.progress,
                  escalate: sla.escalate,
                  duration: {
                    start: sla.duration.start,
                    end: formatISO(newDueTime),
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
                new Date(sla.duration.end.toString().slice(0, -1))
              );

              if (differenceWeeks >= 1) {
                let newDueTime = addWeeks(
                  new Date(sla.duration.end.toString().slice(0, -1)),
                  differenceDays
                );

                if (holidaysAU2024.includes(formatISO(newDueTime))) {
                  newDueTime = addWeeks(
                    new Date(sla.duration.end.toString().slice(0, -1)),
                    2
                  );
                }

                if (isWeekend(newDueTime)) {
                  newDueTime = nextMonday(
                    new Date(sla.duration.end.toString().slice(0, -1)),
                    1
                  );
                }

                return {
                  _id: sla._id,
                  name: sla.name,
                  instruction: sla.instruction,
                  status: sla.status,
                  progress: sla.progress,
                  escalate: sla.escalate,
                  duration: {
                    start: sla.duration.start,
                    end: formatISO(newDueTime),
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
                new Date(sla.duration.end.toString().slice(0, -1))
              );

              if (differenceMonthly >= 1) {
                let newDueTime = addMonths(
                  new Date(sla.duration.end.toString().slice(0, -1)),
                  differenceDays
                );

                if (holidaysAU2024.includes(formatISO(newDueTime))) {
                  newDueTime = addMonths(
                    new Date(sla.duration.end.toString().slice(0, -1)),
                    2
                  );
                }

                if (isWeekend(newDueTime)) {
                  newDueTime = nextMonday(
                    new Date(sla.duration.end.toString().slice(0, -1)),
                    1
                  );
                }
                return {
                  _id: sla._id,
                  name: sla.name,
                  instruction: sla.instruction,
                  status: sla.status,
                  progress: sla.progress,
                  escalate: sla.escalate,
                  duration: {
                    start: sla.duration.start,
                    end: formatISO(newDueTime),
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
                new Date(sla.duration.end.toString().slice(0, -1))
              );

              if (differenceQuarterly >= 1) {
                let newDueTime = addQuarters(
                  new Date(sla.duration.end.toString().slice(0, -1)),
                  differenceDays
                );

                if (holidaysAU2024.includes(formatISO(newDueTime))) {
                  newDueTime = addQuarters(
                    new Date(sla.duration.end.toString().slice(0, -1)),
                    2
                  );
                }

                if (isWeekend(newDueTime)) {
                  newDueTime = nextMonday(
                    new Date(sla.duration.end.toString().slice(0, -1)),
                    1
                  );
                }
                return {
                  _id: sla._id,
                  name: sla.name,
                  instruction: sla.instruction,
                  status: sla.status,
                  progress: sla.progress,
                  escalate: sla.escalate,
                  duration: {
                    start: sla.duration.start,
                    end: formatISO(newDueTime),
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
                new Date(sla.duration.end.toString().slice(0, -1))
              );

              if (differenceYears >= 1) {
                let newDueTime = addYears(
                  new Date(sla.duration.end.toString().slice(0, -1)),
                  differenceDays
                );

                if (holidaysAU2024.includes(formatISO(newDueTime))) {
                  newDueTime = addYears(
                    new Date(sla.duration.end.toString().slice(0, -1)),
                    2
                  );
                }

                if (isWeekend(newDueTime)) {
                  newDueTime = nextMonday(
                    new Date(sla.duration.end.toString().slice(0, -1)),
                    1
                  );
                }
                return {
                  _id: sla._id,
                  name: sla.name,
                  instruction: sla.instruction,
                  status: sla.status,
                  progress: sla.progress,
                  escalate: sla.escalate,
                  duration: {
                    start: sla.duration.start,
                    end: formatISO(newDueTime),
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
      return {
        _id: task._id,
        manager: task.manager,
        client: task.client,
        processor: task.processor,
        reviewer: task.reviewer,
        sla: updatedEndDateTime,
      };
    });

    const resetRecurrence = await Promise.all(
      convertedTasks.map(async (task) => {
        const { _id, manager, client, processor, reviewer, sla } = task;
        try {
          const response = await taskModel.updateOne(
            { _id },
            { _id, manager, client, processor, reviewer, sla }
          );
          return response;
        } catch (error) {
          return error;
        }
      })
    );

    const resetDone = await taskModel.updateMany(
      {},
      { $set: { "sla.$[elem].status": "todo" } },
      {
        arrayFilters: [{ "elem.status": { $eq: "done" } }],
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        response: { resetRecurrence: resetRecurrence, resetDone: resetDone },
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
