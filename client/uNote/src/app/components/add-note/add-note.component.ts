import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent {

  noteForm: FormGroup;

  constructor(private noteService: NoteService, private formBuilder: FormBuilder, private ngZone: NgZone, private router: Router) {

    this.noteForm = this.formBuilder.group({
      title: [''],
      content: ['']
    })
  }

  // Save note
  saveNote(): any {
    this.noteService.addNote(this.noteForm.value)
      .subscribe(() => {
        alert('Note added successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/notes'))
      }, (err) => {
        alert('Operation unsuccessful, please try again!')
        console.log(err);
      });
  }

}
