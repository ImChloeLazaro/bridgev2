const mongoose = require("mongoose");
const {
  differenceInDays,
  differenceInMonths,
  differenceInQuarters,
  differenceInWeeks,
  differenceInYears,
} = require("date-fns");
const { parseZonedDateTime } = require("@internationalized/date");
const taskModel = require("/opt/schema/cmsTaskSchema.js");
const itemModel = require("/opt/schema/itemSchema.js");
mongoose.connect(process.env.DATABASE);

exports.handler = async (event) => {
  try {
    const tasks = await taskModel.find();
    const dailyTasks = tasks
      .filter(
        (task) =>
          task.sla &&
          task.sla.some((s) => s.duration && s.duration.recurrence === "daily")
      )
      .map((task) => ({
        manager: task.manager,
        client: task.client,
        processor: task.processor,
        reviewer: task.reviewer,
        sla: task.sla.filter(
          (s) => s.duration && s.duration.recurrence === "daily"
        ),
      }));
    console.log("dailyTasks", dailyTasks);

    console.log("tasks", tasks);

    const convertedTasks = tasks.map((task) => {
      const updatedEndDateTime = task.sla.map((sla) => {
        if (sla.progress.toLowerCase() === "overdue") {
          return {
            ...sla,
            progress: "good",
          };
        }
        if (sla.status === "done") {
          return {
            ...sla,
            status: "todo",
          };
        }
        // Add validation for weekends and holidays (array lookup)
        if (sla.status === "todo" || sla.status === "done") {
          console.log("sla.duration.end", sla.duration.end);

          if (sla.duration.recurrence.toLowerCase() === "daily") {
            let difference = differenceInDays(
              new Date(),
              new Date(sla.duration.end)
            );

            console.log("difference daily", difference);
            if (difference >= 1) {
              return {
                ...sla,
                duration: {
                  ...sla.duration,
                  end: parseZonedDateTime(sla.duration.end)
                    .add({
                      days: 1,
                    })
                    .toString(),
                },
              };
            }
          }
          if (sla.duration.recurrence.toLowerCase() === "weekly") {
            let difference = differenceInWeeks(
              new Date(),
              new Date(sla.duration.end)
            );
            console.log("difference weekly", difference);

            if (difference >= 1) {
              return {
                ...sla,
                duration: {
                  ...sla.duration,
                  end: parseZonedDateTime(sla.duration.end)
                    .add({
                      weeks: 1,
                    })
                    .toString(),
                },
              };
            }
          }
          if (sla.duration.recurrence.toLowerCase() === "monthly") {
            let difference = differenceInMonths(
              new Date(),
              new Date(sla.duration.end)
            );
            console.log("difference monthly", difference);

            if (difference >= 1) {
              return {
                ...sla,
                duration: {
                  ...sla.duration,
                  end: parseZonedDateTime(sla.duration.end)
                    .add({
                      months: 1,
                    })
                    .toString(),
                },
              };
            }
          }
          if (sla.duration.recurrence.toLowerCase() === "quarterly") {
            let difference = differenceInQuarters(
              new Date(),
              new Date(sla.duration.end)
            );
            console.log("difference quarterly", difference);

            if (difference >= 1) {
              return {
                ...sla,
                duration: {
                  ...sla.duration,
                  end: parseZonedDateTime(sla.duration.end)
                    .add({
                      months: 3,
                    })
                    .toString(),
                },
              };
            }
          }
          if (sla.duration.recurrence.toLowerCase() === "yearly") {
            let difference = differenceInYears(
              new Date(),
              new Date(sla.duration.end)
            );
            console.log("difference yearly", difference);

            if (difference >= 1) {
              return {
                ...sla,
                duration: {
                  ...sla.duration,
                  end: parseZonedDateTime(sla.duration.end)
                    .add({
                      years: 1,
                    })
                    .toString(),
                },
              };
            }
          }
          return sla;
        } else {
          return sla;
        }
      });
      console.log("updatedEndDateTime", updatedEndDateTime);
      return { ...task, sla: updatedEndDateTime };
    });

    console.log("convertedTasks", convertedTasks);

    const item = await itemModel.create(dailyTasks);

    const responseAll = await Promise.all(
      convertedTasks.map(async (task) => {
        console.log("task", task);
        const { _id, index, name, client, processor, reviewer, duration, sla } =
          task;
        const response = await taskModel.updateOne(
          { _id },
          { _id, index, name, client, processor, reviewer, duration, sla }
        );

        return { success: response ?? false };
      })
    );
    console.log("RESPONSE FROM UPDATING RECURRENCE", responseAll);

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
