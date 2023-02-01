import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes: any = [];

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    // Fetch notes
    this.noteService.getNotes().subscribe(res => {
      console.log(res)
      this.notes = res;
    });
  }

}
