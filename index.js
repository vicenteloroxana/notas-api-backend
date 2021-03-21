// export module
const express = require('express')
const cors = require('cors')
const logger = require('./loggerMiddleware')

const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(logger)

let notes = [
  {
    id: 1,
    content: 'Me tengo que suscribir',
    date: '2019-05-95T18:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Ir al gym',
    date: '2019-05-95T18:30:31.098Z',
    important: false
  },
  {
    id: 3,
    content: 'Tengo que ir al medico',
    date: '2019-05-95T18:30:31.098Z',
    important: true
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Bienvenidos</h1>')
})
// get notas
app.get('/api/notes', (request, response) => {
  response.json(notes)
})
// get de una nota
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})
// delete de una nota
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})
// post crear nota
app.post('/api/notes', (request, response) => {
  const note = request.body
  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note content is missing'
    })
  }
  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)
  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }
  notes = [...notes, newNote]
  response.json(newNote)
})
app.use((request, response) => {
  console.log(request.path)
  response.status(404).json({
    error: 'Not Found'
  })
})
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
