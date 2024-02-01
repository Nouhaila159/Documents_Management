import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import { Document } from '../model/document.model';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private apiUrl = 'http://localhost:3000/documents';

  constructor(private http: HttpClient,    private toastr: ToastrService) { }

  getDocumentsForCurrentUser(): Observable<Document[]>{
    const ownerId = sessionStorage.getItem('username');

    if (ownerId) {
      const url = `${this.apiUrl}?ownerId=${ownerId}`;
      return this.http.get<Document[]>(url);
    } else {
      return new Observable<Document[]>();
    }
  }

  getDocumentById(id: string): Observable<Document> {
    return this.http.get<Document>(`${this.apiUrl}/${id}`);
  }

  addDocument(documentData: any): Observable<Document> {
    return this.http.post<Document>(this.apiUrl, documentData);
  }

  updateDocument(id: string, documentData: any): Observable<Document> {
    return this.http.put<Document>(`${this.apiUrl}/${id}`, documentData);
  }

  deleteDocument(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  detachDocument(documentId: number): Observable<Document> {
    console.log('Trying to detach document with ID:', documentId);

    // Assume you need to pass some data for detachment, adjust accordingly
    const updatedDocumentData = { folderId: null }; // Set folderId to null for detachment

    const detachDocumentUrl = `${this.apiUrl}/${documentId}`;

    return this.http.patch<Document>(detachDocumentUrl, updatedDocumentData).pipe(
      tap((result) => {
        console.log('Document detached successfully:', result);
        this.toastr.success('Document detached successfully.');
      }),
      catchError((error) => {
        console.error('Error detaching document:', error);
        this.toastr.error(`Error detaching document: ${error.message || 'Unknown error'}`);
        return throwError(error);
      })
    );
  }




}


