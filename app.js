const fs = require("fs");
const _ = require("lodash");
const yargs = require('yargs');

const notes = require('./notes.js')

var titleOptions = {
    describe: "Title of note",
    demand: true,
    alias: 't'
};

var bodyOptions = {
    describe: "Body of note",
    demand: true,
    alias: 'b'
};

var argv = yargs
    .command("add", "Add a new note", {
        title: titleOptions,
        body: bodyOptions

    })
    .command("list", 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .help()
    .argv;




var command = argv._[0];

if (command === "add") {
    var note = notes.addNote(argv.title, argv.body);

    if (note) {
        console.log(`Note saved successfuly`);
        notes.logNote(note);
    } else {
        console.log(`The note with this title already exist. Please use another title and try again.`);
    }
}
else if (command === "list") {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => {
        return notes.logNote(note);
    });

}
else if (command === 'read') {
    var note = notes.getNote(argv.title);

    if (note) {
        console.log(`Note found successfuly`);
        notes.logNote(note);
    } else {
        console.log(`Note not found`);
    }
}
else if (command === 'remove') {
    var removeNote = notes.removeNote(argv.title);
    var message = removeNote ? "Note removed successfuly" : "Note doesn't exist";

    console.log(message);
}
else {
    console.log('command not recognized');
}

