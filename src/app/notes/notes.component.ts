import { Component, OnInit } from '@angular/core';
import { Note } from '../interface/note.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../services/note-service.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit{
  notes!: Note[];
  emptyNote: Note = { title: '', content: '' };
  noteForm!: FormGroup;
  selectedNoteIndex: number = -1;
  originalNote: Note | null = null;

  constructor(private noteService: NoteService, private formBuilder: FormBuilder){}

  ngOnInit() {
    this.noteForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      content:[""]
    })

    this.notes = this.noteService.getNotes();
  }

  get title() {
    return this.noteForm.get('title');
  }
  get content() {
    return this.noteForm.get('content');
  }

  addNewnote(){
    this.selectedNoteIndex = -1;
    this.noteForm.reset(this.emptyNote, { emitEvent: false });
    this.originalNote = null;
  }

  onSubmit() {
    // console.log("here is the note:", this.noteForm.value);
    alert("Notw was saved");
    this.noteService.saveNote(this.noteForm.value, this.selectedNoteIndex);
    this.selectedNoteIndex = -1;
    this.originalNote = null;
    this.noteForm.reset();
  }

  deleteNote(index: number) {
   this.noteService.deleteNote(index);
   this.originalNote = null;
  }

  selectNote(index: number) {
    this.selectedNoteIndex = index;

    const selectedNote = this.notes[this.selectedNoteIndex];
    this.noteForm.setValue({
      title: selectedNote.title,
      content: selectedNote.content
    });
    this.originalNote = {...selectedNote};
    // console.log("the original note:", this.originalNote);
  }

  revertNote(){
    // console.log("reverting!");
    if(this.originalNote){
      this.noteForm.reset(this.originalNote, { emitEvent: false });
    } else {
      this.noteForm.reset(this.emptyNote);
    }
  }
  
}
