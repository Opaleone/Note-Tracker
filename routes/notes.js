const notes = require('express').Router()
const { readFromFile, readAndAppend } = require('../helpers/fsutils')



notes.get('/', (req, res) => {
  console.info(`${req.method} request received`);

  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
  console.info(`${req.method} request received`)

  const {title, text, id} = req.body

  if (title && text) {
    const newNote = {
      title,
      text,
      id,
    }

    newNote.id = Math.floor(Math.random() * 10000)
    console.log(newNote);

    readAndAppend(newNote, './db/notes.json')

    const response = {
      status: 'success',
      body: newNote,
    }

    res.json(response)
  }
})

notes.delete('/:id', (req, res) => {
  console.info(`${req.method} request received`)

  const userId = req.params.id;
  
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));

  if (data.id === userId) {
    
  }

  const response = {
    status: 'success',
    body: newNote,
  }

  res.json(response)
});

module.exports = notes;