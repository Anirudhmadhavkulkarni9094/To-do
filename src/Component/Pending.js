import React, { useEffect, useState } from 'react';
import './Pending.css';
import axios from 'axios';
import AddingNewTask from './AddingNewTask';

function Pending() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    axios.get('https://to-do-w2m4.onrender.com/api/v1/task').then((res) => {
      setTasks(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, [tasks]);


  const handleComplete = (id) => {
    console.log('Completed');
    axios.post(`https://to-do-w2m4.onrender.com/api/v1/task/${id}`).then(() => {
      alert('Task moved to working');
      // You might want to update the task's status in your state here.
    });
  };

  const handleDelete = (id) => {
    console.log('Deleted');
    axios.delete(`https://to-do-w2m4.onrender.com/api/v1/task/${id}`).then(() => {
      alert('Task deleted successfully');
      // You might want to remove the task from your state here.
    });
  };

  const handleNewTask = () => {
    setNewTask(true);
  };

  const handleClose = () => {
    setNewTask(false);
    setEditTask(null); // Close the editing form when closing the new task form
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setTitle(task.title);
    setDesc(task.Desc);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const handleEditApply = () => {
    if (!editTask) {
      return;
    }
    if(title.length === 0 || desc.length === 0) {
      alert("title or description cannot be empty !");
      return;
    }

    axios.post(`https://to-do-w2m4.onrender.com/api/v1/task/update/${editTask._id}`, {
      title,
      Desc: desc,
    }).then(() => {
      alert('Changes applied successfully');
      setEditTask(null);
      // You might want to update the task in your state here.
    }).catch((error) => {
      console.error('Error applying changes:', error);
      alert('Error applying changes. Please try again.');
    });
  };
  const handleCloseEdit = ()=>{
    setEditTask(false)
  }

  function reverseString(str) {
    let dateParts = str.split('-');
    let reversedDate = dateParts.reverse().join('-');
    return reversedDate;
  }

  let pendingTasks = tasks.filter(task =>  task.status ===  "pending")

  return (
    <>
      <div className='Slab'>
        <div className='pending-header'>
          <h3>Pending - {pendingTasks.length} tasks</h3>
          <button className='btn' onClick={handleNewTask}>Add new Task +</button>
        </div>
          {
            (pendingTasks.length === 0) && <img src={require('./NEWTASK.png')} className='newTaskImg'></img> 
          }
        <div>
          {pendingTasks.map((task) => (
            <div key={task._id} className='pending-card'>
              <h4 title={task.Desc}>Title: {task.title.toUpperCase()}</h4>
              <p className="red">status: {task.status}</p>

              <p className='date'>
                <img src={require('./refresh.png')} className='refresh' alt='' />
                last updated on {reverseString(task.Date.toString().slice(0, 10))}
              </p>
              <button onClick={() => handleComplete(task._id)} className='btn'>Start</button>
              <button onClick={() => handleDelete(task._id)} className='btn'>Delete</button>
              <button onClick={() => handleEdit(task)} className='btn'>Edit</button>
              {editTask && editTask._id === task._id && (
                <form onSubmit={(e) => { e.preventDefault(); handleEditApply(); }} className='edit-task'>
                  <label>Title</label>
                  <input value={title} onChange={handleTitleChange}></input>
                  <label>Description</label>
                  <textarea value={desc} onChange={handleDescChange}></textarea>
                  <div className='btn-edit-block'>
                  <button className='btn btn-edit' type='submit'>Apply</button>
                  <button className='btn btn-edit' onClick={handleCloseEdit}>Close</button>
                  </div>
                </form>
              )}
            </div>
          ))}
        </div>
        {newTask && 
          <div className='newTask'>
            <AddingNewTask handleClose={handleClose}></AddingNewTask>
          </div>
        }
      </div>
    </>
  );
}

export default Pending;
