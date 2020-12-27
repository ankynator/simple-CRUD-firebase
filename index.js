const db = firebase.firestore()

const taskForm = document.getElementById("task-form")
const tasksContainer = document.getElementById("tasks-container")

let editStatus = false

const saveTask = (title, description) => 
  db.collection('tasks').doc().set({
    title: title,
    description: description
  })

const getTasks = () => db.collection('tasks').get()

const getTask = (id) => db.collection('tasks').doc(id).get()

const onGetTasks = (callback) => db.collection('tasks').onSnapshot(callback)

const deleteTask = id => db.collection('tasks').doc(id).delete()

window.addEventListener('DOMContentLoaded', async () => {
  onGetTasks((querySnapshot) => {
    tasksContainer.innerHTML = ''

    querySnapshot.forEach(doc => {
      const task = doc.data()
      task.id = doc.id
      tasksContainer.innerHTML += `
      <div class="card card-body mt-2 border-primary">
        <h5>
          ${task.title}
        </h5>
        <p>
          ${task.description}
        </p>
        <div>
          <button class="btn btn-primary btn-delete" data-id="${task.id}">Delete</button>
          <button class="btn btn-secondary btn-edit" data-id="${task.id}">Edit</button>
        </div>
      </div>`
    })

    const btnsDelete = document.querySelectorAll('.btn-delete')

    btnsDelete.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        await deleteTask(e.target.dataset.id)
      })
    })

    const btnsEdit = document.querySelectorAll('.btn-edit')

    btnsEdit.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const doc = await getTask(e.target.dataset.id)
        const task = doc.data()
        
        taskForm['task-title'].value = task.title
        taskForm['task-description'].value = task.description
      })
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
