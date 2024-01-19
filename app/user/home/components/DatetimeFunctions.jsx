export const calculateDateDiff = {
  inMinutes: (datetime1, datetime2) => {
    const time2 = datetime2.getTime();
    const time1 = datetime1.getTime();

    return Math.abs(Math.floor((time2 - time1) / (60 * 1000)));
  },

  inHours: (datetime1, datetime2) => {
    const time2 = datetime2.getTime();
    const time1 = datetime1.getTime();

    return Math.abs(Math.floor((time2 - time1) / (60 * 60 * 1000)));
  },

  inDays: (datetime1, datetime2) => {
    const time2 = datetime2.getTime();
    const time1 = datetime1.getTime();

    return Math.abs(Math.floor((time2 - time1) / (24 * 60 * 60 * 1000)));
  },

  inWeeks: (datetime1, datetime2) => {
    const time2 = datetime2.getTime();
    const time1 = datetime1.getTime();

    return parseInt((time2 - time1) / (24 * 60 * 60 * 1000 * 7));
  },

  inMonths: (datetime1, datetime2) => {
    const datetime1Year = datetime1.getFullYear();
    const datetime2Year = datetime2.getFullYear();
    const datetime1Month = datetime1.getMonth();
    const datetime2Month = datetime2.getMonth();

    return (
      datetime2Month +
      12 * datetime2Year -
      (datetime1Month + 12 * datetime1Year)
    );
  },

  inYears: (datetime1, datetime2) => {
    return datetime2.getFullYear() - datetime1.getFullYear();
  },
};
export const calculateDateAdd = {
  addHours: (date, hours) => {
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);

    return date;
  },
  addMinutes: (date, minutes) => {
    date.setTime(date.getTime() + minutes * 60 * 1000);

    return date;
  },
};
