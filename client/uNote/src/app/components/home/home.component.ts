import { Component } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  notes: any = [];
  jwtPayload = JSON.parse(atob(localStorage.getItem('access_token')!.split('.')[1])); // Get values from the token payload

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    // Fetch notes
    this.noteService.getNotes().subscribe(res => {
      console.log(res)
      this.notes = res;
    });
  }

}
