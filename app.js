// const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

// Customize yargs version
yargs.version('1.1.0')

// add, remove, read individual, list all

// create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demand: true,
            type: 'string'
        },
        body: {
            describe: 'Body of the note',
            demand: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.add_note(argv.title, argv.body)  
    } 
})

// create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demand: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.remove_note(argv.title)
    } 
})

// create list command 
yargs.command({
    command: 'list',
    describe: 'List out all of your notes',
    handler() {
        notes.list_notes()
    }
})

// create read command
yargs.command({
    command: 'read',
    describe: 'Read a specific note',
    builder: {
        title: {
            describe: 'Title of the note you want to read',
            demand: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.read_note(argv.title)
    }
})

yargs.parse()

// console.log(yargs.argv)