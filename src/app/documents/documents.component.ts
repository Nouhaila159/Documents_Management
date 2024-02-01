import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Document } from '../model/document.model';
import { ToastrService } from 'ngx-toastr';
import { DocumentService } from '../service/document.service';
import { PopupdocumentComponent } from '../popupdocument/popupdocument.component';
import { MatDialog } from '@angular/material/dialog';
import {FolderService} from "../service/folder.service";
import {Folder} from "../model/folder.model";

@Component({
  selector: 'app-document',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentComponent implements OnInit {
  dataSource = new MatTableDataSource<Document>();
  displayedColumns: string[] = ['title', 'path', 'type', 'sizeInBytes','folderId', 'lastModified', 'action'];
  folders: any[] = [];
  searchText: string = '';
  documents: Document[] = [];
  filteredDocuments: Document[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private documentService: DocumentService,
    private folderService:FolderService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadFolders();
  }

  loadDocuments() {
    this.documentService.getDocumentsForCurrentUser().subscribe(
      (documents) => {
        this.dataSource.data = documents;
        this.dataSource.paginator = this.paginator;
        this.documents = documents;
        this.filteredDocuments = [...this.documents]; // Initialiser filteredFolders avec tous les dossiers

      },
      (error) => {
        console.error('Error fetching documents:', error);
        // Handle the error here as needed
      }
    );
  }

  Openpopup(id?: any) {
    const _popup = this.dialog.open(PopupdocumentComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id
      }
    });
    _popup.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.toastr.success('Document operation successful!', 'Success');
      } else if (result === 'error') {
        this.toastr.error('Document operation failed!', 'Error');
      }
      this.loadDocuments();
    });
  }

  EditDocument(id: any) {
    this.Openpopup(id);
  }


  RemoveDocument(id: any) {
    const confirmation = confirm('Are you sure you want to remove this document?');
    if (confirmation) {
      this.documentService.deleteDocument(id).subscribe(
        (response) => {
          this.toastr.success('Document removed successfully!', 'Success');
          this.loadDocuments();
        },
        (error) => {
          this.toastr.error('Failed to remove document!', 'Error');
        }
      );}}


  getFolderName(folderId: number): string {
    console.log('Folder ID:', folderId);
    console.log('Folders:', this.folders);
    const folder = this.folders.find(f => f.id === folderId);
    console.log('Selected Folder:', folder);
    return folder ? folder.name : 'Unassigned';
  }

  loadFolders() {
    this.folderService.getFoldersForCurrentUser().subscribe(
      (folders) => {
        this.folders = folders;
        this.loadDocuments();
      },
      (error) => {
        console.error('Error fetching folders:', error);
      }
    );
  }

  searchDocuments() {
    if (this.searchText.trim() !== '') {
      this.filteredDocuments = this.documents.filter(document =>
        document.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredDocuments = [...this.documents];
    }
    this.dataSource.data = this.filteredDocuments;
  }

}
