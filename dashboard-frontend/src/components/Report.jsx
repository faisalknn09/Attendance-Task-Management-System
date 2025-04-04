import { DatePicker } from "antd";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

dayjs.extend(isBetween);

const url = "http://localhost:8080/task";

const Report = () => {
  const [dates, setDates] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Fetch work report data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/fetch`);
        const result = await response.json();
        setData(result);
        setFilteredData(result); // Initialize filteredData with all data
      } catch (error) {
        console.error("Error fetching work report:", error);
      }
    };
    fetchData();
  }, []);

  // Generate and Download Excel
  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Work Report");
    XLSX.writeFile(wb, "work_report.xlsx");
  };

  const handleDateRangeChange = (values) => {
    if (values && values.length === 2) {
      let [start, end] = values;

      // Ensure correct date parsing
      const formattedStart = start.format('DD-MM-YYYY');
      const formattedEnd = end.format('DD-MM-YYYY');
      console.log('Raw Start:', formattedStart, 'Raw End:', formattedEnd);      
      setDates([formattedStart, formattedEnd]);

      const filtered = data.filter(item => {
        console.log(typeof(item.date), 'Item Date:', item.date);
        dayjs.extend(isBetween);
        return dayjs(item.date, 'DD-MM-YYYY').isBetween(start, end, 'day', '[]');
      });
      
      console.log('Filtered:', filtered);
      setFilteredData(filtered);
    } else {
      setDates([]);
      setFilteredData(data);
    }
  };

  return (
    <div className="container">
      <div className="bg-blue-800 text-white" id="taskdiv">Work Report</div>
      <div className="flex">
        <h1 className='text-2xl font-normal'>Please Select Date Range</h1>
        <DatePicker.RangePicker
          format="DD/MM/YYYY"
          className="ml-auto w-80 border-black border-2 custom-range-picker calan"
          onChange={handleDateRangeChange}
        />
      </div>
      <table className="ml-16 outline w-5/6 text-center mt-4">
        <thead>
          <tr>
            <th>Date</th>
            <th>Work Done</th>
            <th>Time Taken</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.taskPerformed}</td>
              <td>{item.timeSpent}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={downloadExcel}
        className="border-black border-4 mt-4 bg-white text-blue-500 m-auto py-2 w-1/6 rounded-lg calan"
      >
        Download Excel
      </button>
    </div>
  );
};

export default Report;