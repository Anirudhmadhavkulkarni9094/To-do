import React, { useEffect, useState } from 'react';
import './Asset/StyleSheet/Completed.css'
import axios from 'axios'
import Card from './Card';

function Completed() {
  const [tasks, setTasks] = useState([]);
  useEffect(()=>{
    axios.get('https://to-do-w2m4.onrender.com/api/v1/task').then(res=>{
        setTasks(res.data)
    }).catch(err=>{
        console.log(err)
    })
  } , [tasks])

  
  const pendingTasks = tasks.filter(task => {
    return task.status === "finished";
  });
  
  return (
    <>
      <div className='Slab'>
        <h3>Completed - {pendingTasks.length} tasks</h3>
        {pendingTasks.length === 0 && <img className='empty' src={require('./Asset/Image/completed.png')} alt=''></img>}
        <div>
          {pendingTasks.map(task => (
            <div key={task.id} className='pending-card'>
              
              <Card task = {task}></Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Completed