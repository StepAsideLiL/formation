import * as d from "date-fns";

const date = {
  format: (date: Date) => {
    return d.format(date, "d MMMM yyyy");
  },
};

export default date;
