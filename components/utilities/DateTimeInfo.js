const DateTimeInfo = (date, relative = false, localeString = "en-US") => {
  const displayDate = new Date(date);
  const dateOptions = {
    timeZone: "America/New_York",
    year: "numeric",
    day: "numeric",
    month: "long"
  };
  if (relative) {
    const now = new Date();
    const interval = Math.abs((now - displayDate) / 60000);

    if (interval < 1) {
      return "seconds ago";
    }
    if (interval < 5) {
      return "moments ago";
    }
    if (interval < 60) {
      return `${Math.floor(interval.length("minutes"))} minutes ago`;
    }
    if (interval / 60 < 24) {
      dateOptions.month = "2-digit";
      dateOptions.day = "2-digit";
      const displayDateLocaleString = displayDate.toLocaleString(
        localeString,
        dateOptions
      );
      const nowLocaleString = now.toLocaleString(localeString, dateOptions);
      dateOptions.month = "long";
      dateOptions.day = "numeric";
      const hasSameDay =
        displayDateLocaleString.substring(3, 5) ===
        nowLocaleString.substring(3, 5);
      if (hasSameDay) {
        const isHourPlural = Math.round(interval / 60) > 1;
        return `${Math.floor(interval.length("hours"))} hour${
          isHourPlural ? "s" : ""
        } ago`;
      }
    }
  }
  return displayDate.toLocaleString(localeString, dateOptions);
};

export default DateTimeInfo;
