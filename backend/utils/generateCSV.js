/**
 * CSV Generation Utility
 *
 * Converts an array of enquiry documents into a CSV string
 * using json2csv. Defines custom column labels and field mapping.
 */

const { Parser } = require("json2csv");

/**
 * Generate CSV string from an array of enquiry documents
 * @param {Array} enquiries — Array of Mongoose enquiry documents
 * @returns {String} CSV formatted string
 */
const generateCSV = (enquiries) => {
  const fields = [
    { label: "ID", value: "_id" },
    { label: "Full Name", value: "fullName" },
    { label: "Phone Number", value: "phoneNumber" },
    { label: "Email", value: "email" },
    { label: "Service Type", value: "serviceType" },
    { label: "Company Name", value: "companyName" },
    { label: "City", value: "city" },
    { label: "Loan Amount", value: "loanAmount" },
    { label: "Monthly Income", value: "monthlyIncome" },
    { label: "Message", value: "message" },
    { label: "Status", value: "status" },
    { label: "Source", value: "source" },
    {
      label: "Follow-Up Date",
      value: (row) =>
        row.nextFollowUp && row.nextFollowUp.date
          ? new Date(row.nextFollowUp.date).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
          : "",
    },
    {
      label: "Follow-Up Completed",
      value: (row) =>
        row.nextFollowUp && row.nextFollowUp.date
          ? (row.nextFollowUp.completed ? "Yes" : "No")
          : "",
    },
    {
      label: "Notes",
      value: (row) =>
        row.notes && row.notes.length
          ? row.notes.map((n) => `[${new Date(n.createdAt).toLocaleDateString("en-IN")}] ${n.text}`).join(" | ")
          : "",
    },
    {
      label: "Submitted At",
      value: (row) =>
        row.createdAt
          ? new Date(row.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
          : "",
    },
    {
      label: "Last Updated",
      value: (row) =>
        row.updatedAt
          ? new Date(row.updatedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
          : "",
    },
  ];

  const parser = new Parser({ fields, defaultValue: "" });
  return parser.parse(enquiries);
};

module.exports = { generateCSV };
