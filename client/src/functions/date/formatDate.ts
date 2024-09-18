import { format } from "date-fns";

// Formats to MM/DD/YYYY
export const formatDate = (date: string | undefined) => {
  return date ? format(new Date(date), "P") : "";
};
