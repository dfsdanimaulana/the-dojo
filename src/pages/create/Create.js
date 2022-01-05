import { useState } from 'react'

// styles
import './Create.css'

export default function Create() {
  const {name, setName} = useState('')
  const {details, setDetails} = useState('')
  const {dueDate, setDueDate} = useState('')
  const {category, setCategory} = useState('')
  const {assignedUser, setAssignedUser} = useState([])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, details, dueDate)
  }
  return (
      <div className="create-form">
        <h2 className="page-title">Create new project</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Project name:</span>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </label>
          <label>
            <span>Project details:</span>
            <textarea
              type="text"
              onChange={(e) => setDetails(e.target.value)}
              value={details}
              required
            ></textarea>
          </label>
          <label>
            <span>Set due dates:</span>
            <input
              type="date"
              onChange={(e) => setDueDate(e.target.value)}
              value={dueDate}
              required
            />
          </label>
          <button className="btn">Add Project</button>
        </form>
      </div>
    )
}
