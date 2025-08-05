// export const exportToCSV = (data, filename = "export") => {
//   if (!data || !data.length) return;

//   const headers = Object.keys(data[0]);
//   const csvRows = [
//     headers.join(","), // header row
//     ...data.map((row) =>
//       headers
//         .map((field) => `"${String(row[field]).replace(/"/g, '""')}"`)
//         .join(",")
//     ),
//   ];

//   const csvContent = csvRows.join("\n");
//   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

//   const link = document.createElement("a");
//   link.href = URL.createObjectURL(blob);
//   link.setAttribute("download", `${filename}.csv`);
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

export const exportToCSV = (data) => {
  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers.map((field) => JSON.stringify(row[field] ?? "")).join(",")
  );
  const csvContent = [headers.join(","), ...rows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "table_data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
