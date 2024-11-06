export function formatDateWithDayName(timestamp) {
    const date = new Date(timestamp);
    const dayName = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(date);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${dayName}, ${year}-${month}-${day}`;
  }