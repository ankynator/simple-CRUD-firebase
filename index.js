const db = firebase.firestore()

const taskForm = document.getElementById("task-form")
const tasksContainer = document.getElementById("tasks-container")

const saveTask = (title, description) => 
  db.collection('tasks').doc().set({
    title: title,
    description: description
  })

const getTasks = () => db.collection('tasks').get()

const onGetTasks = (callback) => db.collection('tasks').onSnapshot(callback)

window.addEventListener('DOMContentLoaded', async () => {
  onGetTasks((querySnapshot) => {
    tasksContainer.innerHTML = ''

    querySnapshot.forEach(doc => {

      console.log(doc.data().title)
      const task = doc.data()
  
      tasksContainer.innerHTML += `
      <div class="card card-body mt-2 border-primary">
        <h5>
          ${task.title}
        </h5>
        <p>
          ${task.description}
        </p>
        <div>
          <button class="btn btn-primary">Delete</button>
          <button class="btn btn-secondary">Edit</button>
        </div>
      </div>`
  
    })
  })
})


taskForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const title = taskForm['task-title']
  const description = taskForm['task-description']

  await saveTask(title.value, description.value)

  taskForm.reset()
  title.focus()

  console.log(title, description)
})
