import "antd/dist/reset.css";  // For newer versions (v5+)
import { DatePicker } from "antd";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
const url = "http://localhost:8080/task";

function Info() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async (date) => {
    try {
      const response = await fetch(`${url}/${date.format("DD-MM-YYYY")}`);
      const result = await response.json();
      console.log(result);
      setData(result);
      setFilteredData(result);
    } catch (error) {
      console.error("Error fetching work report:", error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchData(date);
  };

  // Fetch data on component mount based on default date
  useEffect(() => {
    fetchData(selectedDate);
  },);

  return (
    <>
      <div className="container">
        <div className="bg-blue-800 text-white" id="taskdiv">Task Summary</div>
        <div className="flex">
          <h1 className='text-2xl font-normal'>Here is your Task Info</h1>
          <DatePicker
            className="ml-auto w-64 border-black border-2 custom-range-picker calan"
            defaultValue={selectedDate}
            onChange={handleDateChange}
            format="DD-MM-YYYY"
          />
        </div>
        <table className="ml-16 outline w-5/6 text-center">
          <thead>
            <tr>
              <th>Date</th>
              <th>Task</th>
              <th>Time Spend</th>
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
      </div>
    </>
  );
}

export default Info;