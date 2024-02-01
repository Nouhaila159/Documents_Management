import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Folder} from "../model/folder.model";
import {Document} from "../model/document.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getFoldersForCurrentUser(): Observable<Folder[]> {
    const ownerId = sessionStorage.getItem('username');

    if (ownerId) {
      const folderUrl = `${this.apiUrl}/folders?ownerId=${ownerId}`;
      return this.http.get<Folder[]>(folderUrl);
    } else {
      return new Observable<Folder[]>();
    }
  }

  getDocumentsForCurrentUser(): Observable<Document[]> {
    const ownerId = sessionStorage.getItem('username');

    if (ownerId) {
      const documentUrl = `${this.apiUrl}/documents?ownerId=${ownerId}`;
      return this.http.get<Document[]>(documentUrl);
    } else {
      return new Observable<Document[]>();
    }
  }

  getAllUsers() {
    return this.http.get(`${this.apiUrl}/user`);
  }

  getUserData(username: string): Observable<any> {
    const url = `${this.apiUrl}/user/${username}`;
    return this.http.get(url);
  }


}
