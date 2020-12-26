const db = firebase.firestore()

const taskForm = document.getElementById("task-form")


const saveTask = (title, description) => 
  db.collection('tasks').doc().set({
    title: title,
    description: description
  })

const getTasks = () => db.collection('tasks').get()


window.addEventListener('DOMContentLoaded', async () => {
  const querySnapshot = await getTasks()
  querySnapshot.forEach(doc => {
    //imprimiendo los titulos de las tareas
    console.log(doc.data().title)
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
