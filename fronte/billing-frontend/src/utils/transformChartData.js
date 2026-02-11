export const transformChartData = (data, type = "daily") => {
    if (!Array.isArray(data)) return [];
  
    return data.map((item) => {
      const { day, month, year } = item._id;
  
      let label = "";
  
      if (type === "daily") {
        label = `${day}/${month}`;
      }
  
      if (type === "monthly") {
        const months = [
          "Jan","Feb","Mar","Apr","May","Jun",
          "Jul","Aug","Sep","Oct","Nov","Dec",
        ];
        label = months[month - 1];
      }
  
      return {
        label,
        sales: item.total,
      };
    });
  };
  