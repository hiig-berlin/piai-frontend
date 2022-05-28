export const formatDate = (date: string, format?: any) => {
  if (!date) return "";

  try {
    const d = new Date(date.replace(/ /g,"T"));
    if (d) return d.toLocaleDateString("en-GB", format).replace(/\//g, ".");
  } catch (e) {}

  return "";
};

export const dateWeekday = (date: string) => {
  if (!date) return "";

  try {
    const d = new Date(date.replace(/ /g,"T"));
    if (d) return d.toLocaleDateString("en-GB", {
      weekday: 'long'
    });
  } catch (e) {}

  return "";
};


export const dateYear = (date: string, defaultToThisYear: boolean = true) => {
  if (!date) return null;

  try {
    const d = new Date(date.replace(/ /g,"T"));
    if (d) return d.toLocaleDateString("en-GB", {
      year: 'numeric'
    });
  } catch (e) {}

  if (!defaultToThisYear) return null;

  const d = new Date();

  return d.toLocaleDateString("en-GB", {
    year: 'numeric'
  });
};
