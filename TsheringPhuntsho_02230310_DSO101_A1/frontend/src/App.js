import { useEffect, useState } from "react"

function App() {

  const [tasks,setTasks] = useState([])
  const [title,setTitle] = useState("")
  const [editId,setEditId] = useState(null)

  const API = process.env.REACT_APP_API_URL

  const fetchTasks = async ()=>{
    const res = await fetch(`${API}/tasks`)
    const data = await res.json()
    setTasks(data)
  }

  useEffect(()=>{
    fetchTasks()
    // eslint-disable-next-line
  },[])

  const addTask = async ()=>{
    if(editId){
      await fetch(`${API}/tasks/${editId}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({title})
      })
      setEditId(null)
    } else {
      await fetch(`${API}/tasks`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({title})
      })
    }
    setTitle("")
    fetchTasks()
  }

  const deleteTask = async (id)=>{
    await fetch(`${API}/tasks/${id}`,{
      method:"DELETE"
    })
    fetchTasks()
  }

  const editTask = (task)=>{
    setTitle(task.title)
    setEditId(task._id)
  }

  return (
    <div className="app" style={{padding:"40px"}}>
      <h1 className="app-title">To-Do App</h1>

      <div className="input-row">
        <input
          className="task-input"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          placeholder="Enter task"
        />

        <button className="btn add-btn" onClick={addTask}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <ul className="task-list">
        {tasks.map(task=>(
          <li key={task._id} className="task-item">
            <span className="task-title">{task.title}</span>
            <div className="item-actions">
              <button className="btn edit-btn" onClick={()=>editTask(task)}>Edit</button>
              <button className="btn delete-btn" onClick={()=>deleteTask(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default App;