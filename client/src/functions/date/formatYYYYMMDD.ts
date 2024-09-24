import { format } from "date-fns";
export const formatYYYYMMDD = (date: string | number | undefined) => {
  return date ? format(new Date(date), "yyyy-MM-dd") : "";
};
