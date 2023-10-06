import React from 'react'
import Pending from './Pending'
import Working from './Working'
import Completed from './Completed'
import './Asset/StyleSheet/Task.css'
function Task() {
  return (
    <div className='task-table'>
    <Pending/>
    <Working></Working>
    <Completed/>
    </div>
  )
}

export default Task