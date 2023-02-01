import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Note } from '../models/note.model';

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

  // Get a single note
  getNote(id: any): Observable<any> {
    let api = `${NOTES_API}/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: any) => {
        console.log(res)
        return res[0] || {};
      }),
      catchError(this.handleError)
    );
  }

  // Add note
  addNote(data: Note): Observable<any> {
    let api = `${NOTES_API}`;
    return this.http
      .post(api, data)
      .pipe(catchError(this.handleError));
  }

  // Update note
  updateNote(id: any, data: any): Observable<any> {
    let api = `${NOTES_API}/${id}`;
    return this.http
      .patch(api, data, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // Delete note
  deleteNote(id: any): Observable<any> {
    let api = `${NOTES_API}/${id}`;
    return this.http
      .delete(api, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
