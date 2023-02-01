import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const NOTES_API = 'http://localhost:3000/api/notes';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  constructor(private http: HttpClient, public router: Router) { }

  // Get all notes
  getNotes() {
    return this.http.get(`${NOTES_API}`);
  }
}
