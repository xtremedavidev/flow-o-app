

export const getCurrentDate = () => {
   const date = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(date);

  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const lastUpdated = {
    date: formattedDate,
    time: formattedTime,
  };

  return lastUpdated
}

export const getCurrentDateInLocalString = () => {
  const date = new Date();

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const lastUpdated = {
    date: formattedDate,
    time: formattedTime,
  };

  return lastUpdated;
};
