import { useState, useEffect } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import Select from 'react-select'

// styles
import './Create.css'

// select field options
const categories = [
  { value:'development', label:'Development'},
  { value:'design', label:'Design'},
  { value:'sales', label:'Sales'},
  { value:'marketing', label:'Marketing'}
]

export default function Create() {
  const { user } = useAuthContext()
  const { documents } = useCollection('users')
  const {users, setUsers} = useState([])
  
  // form diled values
  const {name, setName} = useState('')
  const {details, setDetails} = useState('')
  const {dueDate, setDueDate} = useState('')
  const {category, setCategory} = useState('')
  const {assignedUsers, setAssignedUsers} = useState([])
  const {formError, setFormError} = useState(null)
  
  useEffect(()=> {
    if(documents){
      const options = documents.map((user)=>{
        return { value: user, label: user.displayName }
      })
      setUsers(options)
    }
  },[documents, setUsers])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError(null)
    
    // handle select field error
    if(!category){
      setFormError('Please select a project category')
      return
    }
    if(assignedUsers.length < 1){
      setFormError('Please assign the project at least one user')
      return
    }
    
    // create project object

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.id
    }
    
    const assignedUsersList = assignedUsers.map((u)=>{
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.uid
      }
    })
    
    const project = {
      name,
      details,
      category,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList
    }
    console.log(project)
    
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
          <label>
            <span>Project category:</span>
            <Select 
              option={categories}
              onChange={(option)=> setCategory(option.value)}
            />
          </label>
          <label>
            <span>Assign to:</span>
            <Select
              option={users}
              onChange={(option)=> setAssignedUsers(option.value)}
              isMulti
            />
          </label>
          <button className="btn">Add Project</button>
        </form>
        {formError && <p className="error">{formError}</p>}
      </div>
    )
}
