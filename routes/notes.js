const notes = require('express').Router()
const fs = require('fs');
// const { response } = require('.');
let db = require('../db/notes.json')



notes.get('/', (req, res) => {
  console.info(`${req.method} request received`);

  res.json(db)
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

    db.push(newNote);

    fs.writeFile('./db/notes.json', JSON.stringify(db), (err) => {
      err ? console.error(err) : console.log('Success!');
    })

    const response = {
      status: 'success',
      body: newNote,
    }

    res.json(response)
  }
})

notes.delete('/:id', (req, res) => {
  console.info(`${req.method} request received`)

  db = db.filter(note => note.id != req.params.id)

  fs.writeFile('./db/notes.json', JSON.stringify(db), (err) => {
    err ? console.error(err) : console.log('Success!');
  })

  const response = {
    status: 'success',
    body: newNote,
  }

  res.json(response)
});

module.exports = notes;