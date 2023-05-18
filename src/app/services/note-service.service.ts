import { Injectable } from '@angular/core';
import { Note } from '../interface/note.interface';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  notes: Note[] = [];
  constructor() { }

  getNotes(){
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      this.notes = JSON.parse(storedNotes);
    }
    return this.notes;
  }

  saveNote(newNote: Note, noteIndex: number) {
    console.log("note from service:", newNote);
    if(noteIndex !== -1){
        this.notes[noteIndex] = newNote;
    } else {
      this.notes.push(newNote);
    }
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  deleteNote(index: number) {
    this.notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }
}
