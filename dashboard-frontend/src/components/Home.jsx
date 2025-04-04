import { TextField } from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

function Home() {
  const [rows, setRows] = useState([{ task: '', timeSpend: '00:00' }]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = rows.map(row => ({
      taskPerformed: row.task,
      timeSpent: row.timeSpend,
      date: moment().format('DD-MM-YYYY')
    }));
    console.log(data);

    try {
      const response = await fetch('http://localhost:8080/task/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setRows([{ task: '', timeSpend: '' }]);
        toast.success('Successfully submitted task');
      } else {
        toast.error('Failed to submit task');
      }
    } catch (error) {
      toast.error("failed to submit task");
      console.error('Error submitting task:', error);
    }
  };

  const handleAddRow = () => {
    setRows([...rows, { task: '', timeSpend: '' }]);
  };

  const handleRowChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  return (
    <>
      <div><Toaster /></div>
      <div className="container">
        <div className="bg-blue-800 text-white" id="taskdiv">Today task</div>
        <h1 className='text-2xl font-normal'>Please Enter Your Task Here</h1>
        <form onSubmit={handleSubmit}>
          <table className="table outline w-full">
            <thead>
              <tr>
                <th><label htmlFor="task">Task</label></th>
                <th><label htmlFor="timeSpend">Time</label></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>
                    <TextField
                      className="w-full"
                      id="outlined-multiline-static"
                      multiline
                      placeholder='Enter your task'
                      value={row.task}
                      onChange={(e) => handleRowChange(index, 'task', e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type='time'
                      defaultValue="01:00"
                      className="size-full outline-none color"
                      id="outlined-multiline-static"
                      placeholder='Enter Time '
                      value={row.timeSpend}
                      onChange={(e) => handleRowChange(index, 'timeSpend', e.target.value)}
                      required
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button1" className="h-10 w-20 outline bg-slate-300 mt-2" onClick={handleAddRow}>Add</button>
          <button className="button1 h-10 w-20 outline bg-slate-300 float-right mt-2" type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default Home;