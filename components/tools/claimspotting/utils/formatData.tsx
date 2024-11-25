// Format date to a readable format
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

// Truncate text to a certain length
export const truncateText = (text: string, length: number): string =>
  text.length > length ? text.slice(0, length) + "..." : text;

// Format large numbers for chart display
export const formatLargeNumber = (num: number): string => {
  if (num < 1000) return num.toString();
  if (num < 1000000) return (num / 1000).toFixed(1) + "k";
  return (num / 1000000).toFixed(1) + "m";
}

 // Transform json to TSV format where header is json keys and rows are json values
 export const transformToTSV = (inputData: any[]): string => {
  if (inputData.length === 0) return "";
  const cleanedData = inputData.map((row) => ({
    Channel_Name: row?.Channel_Name,
    Text: `"${row.Text ? row.Text.replace(/"/g, "“") : ""}"`,
    Topic: `"${row.Topic}"`,
    Narratives: `"${row.Narratives}"`,
    Factual: row.Factual,
    Polarising: row.Polarising,
    Sensationalist: row.Sensationalist,
    Many_Siblings: row.Many_Siblings,
    High_Diffusion: row.High_Diffusion,
    Views: row.Views,
    Forwards: row.Forwards,
    Link: row.Link,
    Siblings: `"${row.Siblings ? row.Siblings.join("\n") : ""}"`,
  }));
  const header = Object.keys(cleanedData[0]).join("\t");
  const rows = cleanedData.map((row) => Object.values(row).join("\t"));
  return [header, ...rows].join("\n") as string;
};