import { useState, useEffect } from 'react'
import Select from 'react-select'
import { useHistory } from 'react-router-dom'
import { timestamp } from '../../firebase/config'

// hooks
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useFirestore } from '../../hooks/useFirestore'

// styles
import './Create.css'

// select field options
const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]

export default function Create() {
  const { user } = useAuthContext()
  const { documents } = useCollection('users')
  const { response, addDocument } = useFirestore('projects')
  const history = useHistory()

  // form filed values
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName }
      })
      setUsers(options)
    }
  }, [documents])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUsers()
    setFormError(null)

    // handle select field error
    if (!category) {
      setFormError('Please select a project category')
      return
    }
    if (assignedUsers.length < 1) {
      setFormError('Please assign the project at least one user')
      return
    }

    // create project object

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    }

    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      }
    })

    const project = {
      name,
      details,
      category,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList,
    }
    await addDocument(project)
    // redirect if success
    if (!response.error) {
      history.push('/')
    }
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
            required></textarea>
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
            options={categories}
            onChange={(option) => setCategory(option.value)}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label>
        {response.isPending ? (
          <button className="btn">Adding Project...</button>
        ) : (
          <button className="btn">Add Project</button>
        )}
      </form>
      {formError && <p className="error">{formError}</p>}
      {response.error && <p className="error">{response.error}</p>}
    </div>
  )
}
