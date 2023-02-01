import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent {

  noteId: any;
  noteForm: FormGroup;

  constructor(private noteService: NoteService, private formBuilder: FormBuilder, private ngZone: NgZone, private router: Router, private activatedRoute: ActivatedRoute) {
    this.noteId = this.activatedRoute.snapshot.paramMap.get('id'); // Get note id from the URL param

    // Get note data though the API
    this.noteService.getNote(this.noteId).subscribe(res => {
      this.noteForm.setValue({
        title: res['title'],
        content: res['content'],
      });
    });

    this.noteForm = this.formBuilder.group({
      title: [''],
      content: ['']
    })
  }

  // Update note
  updateNote(): any {
    this.noteService.updateNote(this.noteId, this.noteForm.value)
      .subscribe(() => {
        alert('Note updated successfully!');
        this.ngZone.run(() => this.router.navigateByUrl('notes'))
      }, (err) => {
        alert('Operation unsuccessful, please try again!')
        console.log(err);
      });
  }

  // Delete note
  deleteNote(id: any) {
    if (window.confirm('Are you sure to delete this?')) {
      this.noteService.deleteNote(id).subscribe((res) => {
        alert('Note deleted successfully!');
        this.ngZone.run(() => this.router.navigateByUrl('notes'))
      })
    }
  }
}
