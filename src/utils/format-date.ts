export function formatDate(dateStr: string) {
  const date = new Date(dateStr);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  let hours = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; 
  const formattedTime = `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;

  return { formattedDate, formattedTime };
}


export function formatDateToLocalString(dateString: string): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',  
    year: 'numeric',  
    month: 'long',    
    day: 'numeric'   
  };

  const formattedDate = date.toLocaleDateString('en-US', options);

  const day = date.getDate();
  const ordinal = (day % 10 === 1 && day !== 11) ? 'st' :
                  (day % 10 === 2 && day !== 12) ? 'nd' :
                  (day % 10 === 3 && day !== 13) ? 'rd' : 'th';

  return `${formattedDate.replace(/(\d+)/, `$1${ordinal}`)}`;
}
