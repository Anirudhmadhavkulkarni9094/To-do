import React, { useEffect, useState } from 'react';
import './Pending.css'
import axios from 'axios'

function Working() {
  const [tasks, setTasks] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:3001/api/v1/task').then(res=>{
        setTasks(res.data)
    }).catch(err=>{
        console.log(err)
    })
  } , [tasks])

  const pendingTasks = tasks.filter(task => {
    return task.status === "working";
  });

  const handleCompletion = (id)=>{
    console.log("Completed");
    axios.post(`http://localhost:3001/api/v1/task/complete/${id}`).then(alert("Task Completed successfully!!"))
  }
  function reverseString(str) {
    let dateParts = str.split("-");
    let reversedDate = dateParts.reverse().join("-");
    return reversedDate;
  }

  const handleBack = (id)=>{
    axios.post(`https://to-do-w2m4.onrender.com/api/v1/task/BacktoPending/${id}`).then(alert("task moved back to pending"))
  }

  return (
    <>
      <div className='Slab'>
        <h3>Working on - {pendingTasks.length} tasks</h3>
        {pendingTasks.length === 0 && <img src={require('./Completing.png')} className='empty' alt=''></img>}
        <div>
          {pendingTasks.map(task => (
            <div key={task.id} className='pending-card'>
              <h4 title={task.Desc }>Title: {task.title}</h4>
              <p className='black'>{task.status}</p>
              <p className='date'><img src={require('./refresh.png')} className='refresh' alt=''></img> last updated on {reverseString(task.Date.toString().slice(0,10))}</p> 
              <button className='btn' onClick={()=>handleCompletion(task._id)}>Complete</button>
              <button className='btn' onClick={()=>handleBack(task._id)}>Revert</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Working