import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [selectedName, setSelectedName] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [records, setRecords] = useState([]);
  const [names, setNames] = useState([]);
  const [batches, setBatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/names.txt")
      .then((response) => response.text())
      .then((text) => {
        const nameList = text.split("\n").map((name) => name.trim());
        setNames(nameList.filter((name) => name));
      })
      .catch((error) => console.error("Error fetching names:", error));

    fetch("/batch.txt")
      .then((response) => response.text())
      .then((text) => {
        const batchList = text.split("\n").map((batch) => batch.trim());
        setBatches(batchList.filter((batch) => batch));
      })
      .catch((error) => console.error("Error fetching batches:", error));
  }, []);

  const handleSave = () => {
    if (!selectedName || !selectedBatch) return;

    const newRecord = {
      name: selectedName,
      batch: selectedBatch,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    axios.post("http://localhost:8080/api/attendance/save", newRecord)
      .then(() => {
        setRecords([...records, newRecord]);
        setSelectedName("");
        setSelectedBatch("");
      })
      .catch((error) => console.error("Error saving record:", error));
  };

  const handleLogin = () => {
    if (!selectedName) {
      alert("Please select a name before logging in.");
      return;
    }
    // Pass the selected name as state to the App route
    navigate('/app', { state: { selectedName } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-emerald-800 to-teal-300">

      <div className="bg-teal-100 p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-300 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
        <div className="flex flex-col text-left mb-4">
          <label className="text-lg font-semibold text-gray-700">Batch Session</label>
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="border p-2 rounded w-full text-gray-800 bg-gray-100 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Batch</option>
            {batches.map((batch, index) => (
              <option key={index} value={batch}>
                {batch}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col text-left mb-4">
          <label className="text-lg font-semibold text-gray-700">Name</label>
          <select
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
            className="border p-2 rounded w-full text-gray-800 bg-gray-100 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Name</option>
            {names.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => {
            handleSave();
            handleLogin();
          }}
          className="bg-emerald-600 text-white px-8 mt-8 py-2 rounded w-full hover:bg-blue-700 transition"
        >
          Submit
        </button>
        <ul className="mt-2 text-center w-full">
          {records.length === 0 ? (
            <li className="text-gray-500 py-2">No records yet</li>
          ) : (
            records.map((record, index) => (
              <li key={index} className="py-2 text-gray-800 border-b">
                {record.name} - {record.batch} - {record.date} {record.time}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default LoginPage;