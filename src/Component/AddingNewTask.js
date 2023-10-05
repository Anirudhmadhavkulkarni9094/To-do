import React, { useState } from 'react';
import './Pending.css';
import axios from 'axios';

function AddingNewTask({ handleClose }) {
  // State to manage the input values for title and description
  const [Title, setTitle] = useState('');
  const [Desc, setDesc] = useState('');

  // Function to handle adding a new task
  const handleAddingTask = (e) => {
    e.preventDefault(); // Prevent the form from submitting and page reloading

    // Send a POST request to the server to add a new task
    axios
      .post('http://localhost:3001/api/v1/task', {
        title: Title, // Pass the title from the state
        Desc: Desc,   // Pass the description from the state
      })
      .then(() => {
        alert('Added new task'); // Show a success alert
        handleClose(); // Close the form (you should have this function in your parent component)
      })
      .catch((error) => {
        console.error('Error adding task:', error);
        alert('Error adding task. Please try again.'); // Show an error alert
      });
  };

  // Function to handle changes in the title input field
  const handleTitle = (e) => {
    setTitle(e.target.value); // Update the title state with the input value
  };

  // Function to handle changes in the description textarea
  const handleDesc = (e) => {
    setDesc(e.target.value); // Update the description state with the textarea value
  };

  return (
    <div className='form-task'>
      <form onSubmit={handleAddingTask}>
        <div className='task-input'>
          <label>Title</label>
          <input
            placeholder='Title'
            onChange={(e) => handleTitle(e)}
            value={Title} // Bind the input value to the title state
          />
        </div>
        <div className='task-input'>
          <label>Description</label>
          <textarea
            placeholder='Description'
            onChange={(e) => handleDesc(e)}
            value={Desc} // Bind the textarea value to the description state
          />
        </div>
        <button className='btn-task' type='submit'>
          Submit
        </button>
        <button className='btn' onClick={handleClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddingNewTask;
