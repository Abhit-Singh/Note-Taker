const util = require('util');
const fs = require('fs');
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

// Database class for reading and storing
class Database {
    readData() {
        //read db.json
        return readFileAsync('db/db.json', 'utf8')
    }

    writeData(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note))
    }

    //reading all saved notes
    getNotes() {
        return this.readData().then((notes) => {
            
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }
            
            return parsedNotes;
        });
    }

    getLastId(){
        return this.getNotes().then((notes)=>{
            return notes.length
        })
    }
    //creating a new note
    addNote(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw new Error('note title and note text cannot be blank');
        }
        let newId = 0
        return this.getLastId().then((id)=>{
            const newNote = {id:id, title, text };
            return this.getNotes()
                .then((notes) => [...notes, newNote])
                .then((updatedNotes) => this.writeData(updatedNotes))
                .then(() => newNote)
        })
        
    }

    //deleting a note with a specific id 
    removeNote(id) {
        return this.getNotes()
            .then((notes) =>  notes.filter((note) => note.id != id)).then((filteredNotes) => {
                console.log(filteredNotes)
                this.writeData(filteredNotes)
                
            })
    }
}

module.exports = new Database();