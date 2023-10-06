import React from 'react'
import axios from 'axios';

function Card({task}) {
    const handleDelete = (id)=>{
        console.log("deleted");
        axios.delete(`http://localhost:3001/api/v1/task/${id}`).then(alert("task deleted successfully"))
      }
    function reverseString(str) {
        let dateParts = str.split("-");
        let reversedDate = dateParts.reverse().join("-");
        return reversedDate;
      }
    
  return (
    <>
    <h4 title={task.Desc }>Title: {task.title}</h4>
    <p className="green">status: {task.status}</p>
              <p>last updated on {reverseString(task.Date.toString().slice(0,10))}</p>
              <button className='btn' onClick={()=>handleDelete(task._id)}>delete</button>
    </>
  )
}

export default Card