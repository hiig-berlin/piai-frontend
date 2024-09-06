export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "numeric",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", options).replace(",", "");
};

export const truncateText = (text: string, length: number): string =>
  text.length > length ? text.slice(0, length) + "..." : text;