export default  function timeFormatter(isotime = "") {
    if (!isotime) return "";

    const time = isotime.split("T")[0]; // Get YYYY-MM-DD
    let date = new Date(time);

    // Format: DD Mon YYYY
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }