const fs = require("fs/promises");
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')


async function addNote(title) {
const notes = await getNotes()
  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.green('Добавлена заметка'))
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function removeNote(id) {
    const notes = await getNotes()
    const updateNotes = notes.filter(note => note.id !== id)

    if(notes.length === updateNotes.length) {
        console.log(chalk.red('Заметка не найдена!'))
        return
    }

    await  fs.writeFile(notesPath, JSON.stringify(updateNotes))
    console.log(chalk.green('Заметка удалена'))
}

async function printNotes() {
 const notes = await  getNotes()

  console.log(chalk.bgBlue('Полный список заметок'))
  notes.forEach(note => {
    console.log(chalk.blue(note.title),chalk.yellow(note.id))
  })
}

module.exports = {
  addNote,
  printNotes,
  removeNote
}
