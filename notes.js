const fs = require('fs')
const chalk = require('chalk')


const load_notes = () => {
    try {
        const data_buffer = fs.readFileSync('notes.json')
        const dataJSON = data_buffer.toString()
        return JSON.parse(dataJSON)
    } catch(e) {
        return []
    }
}

const save_notes = (notes) => {
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesJSON)
}

const add_note = (title, body) => {
    const notes = load_notes()
    const duplicate_note = notes.find( (note) => note.title === title )

    if (!duplicate_note) {
        notes.push({
            title: title,
            body: body
        })
    
        save_notes(notes)
        console.log(chalk.bgGreen.bold('New note added!'))
    } else {
        console.log(chalk.bgRed.bold('Note title taken'))
    }
}

const remove_note = (title) => {
    const notes = load_notes();
    const updated_notes = notes.filter( (note) => note.title !== title )

    if (updated_notes.length === notes.length) {
        console.log(chalk.bgRed.bold('No note found!'))
    } else {
        save_notes(updated_notes)
        console.log(chalk.bgGreen.bold('Note removed!'))
    }
}

const list_notes = () => {
    const notes = load_notes()

    console.log(chalk.bold.underline('Your Notes'))
    notes.forEach( (note) => {
        console.log(note.title)
    });
}

const read_note = (title) => {
    const notes = load_notes()
    const note_to_read = notes.find( (note) => note.title === title )

    if (note_to_read) {
        console.log(chalk.bold.underline(note_to_read.title))
        console.log(note_to_read.body)
    } else {
        console.log(chalk.bgRed.bold('No note found!'))
    }
}

module.exports = {
    add_note: add_note,
    remove_note: remove_note,
    list_notes: list_notes,
    read_note: read_note
}