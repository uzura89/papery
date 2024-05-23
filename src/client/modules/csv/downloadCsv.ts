export function downloadCSV(csvContent: any) {
  try {
    const encodedUri = encodeURI(csvContent).replace(/#/g, "%23");

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "entries.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link); // Required for FF
    link.click(); // This will download the data file named "my_data.csv".
    document.body.removeChild(link);
  } catch (error) {
    console.error(error);
  }
}
