// folder.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import { Folder } from '../model/folder.model';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  private apiUrl = 'http://localhost:3000/folders';

  constructor(private http: HttpClient) { }

  getFoldersForCurrentUser(): Observable<Folder[]> {
    const ownerId = sessionStorage.getItem('username');

    if (ownerId) {
      const url = `${this.apiUrl}?ownerId=${ownerId}`;
      return this.http.get<Folder[]>(url);
    } else {
      return new Observable<Folder[]>();
    }
  }

  getFolderById(id: number): Observable<Folder> {
    return this.http.get<Folder>(`${this.apiUrl}/${id}`);
  }

  addFolder(folderData: any): Observable<Folder> {
    return this.http.post<Folder>(this.apiUrl, folderData);
  }

  updateFolder(id: number, folderData: any): Observable<Folder> {
    // Before updating the folder, remove its reference from existing documents
    this.getFolderById(id).subscribe(oldFolder => {
      oldFolder.documents.forEach(documentId => {
        this.http.patch(`${'http://localhost:3000/documents'}/${documentId}`, { folderId: null }).subscribe();
      });
    });

    return this.http.put<Folder>(`${this.apiUrl}/${id}`, folderData);
  }

  getFolderDetails(folderId: number): Observable<any> {
    const url = `${this.apiUrl}/${folderId}?_embed=documents`; // Assuming documents are embedded in the folder API response

    return this.http.get<any>(url);
  }

  deleteFolder(id: number): Observable<any> {
    // Before deleting the folder, remove its reference from the documents
    this.getFolderById(id).subscribe(folder => {
      folder.documents.forEach(documentId => {
        this.http.patch(`${'http://localhost:3000/documents'}/${documentId}`, { folderId: null }).subscribe();
      });
    });

    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}

