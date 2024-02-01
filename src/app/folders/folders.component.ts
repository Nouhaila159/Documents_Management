// folder.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { FolderService } from "../service/folder.service";
import {Folder} from "../model/folder.model";
import {PopupfolderComponent} from "../popupfolder/popupfolder.component";
import {MatDialog} from "@angular/material/dialog";
import {DocumentService} from "../service/document.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-folder',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit {
  dataSource = new MatTableDataSource<Folder>();
  displayedColumns: string[] = ['name', 'ownerId', 'lastModified', 'action'];
  searchText: string = '';
  folders: Folder[] = [];
  filteredFolders: Folder[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private folderService: FolderService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router: Router){ }

  ngOnInit(): void {
    this.loadFolders();
  }

  loadFolders() {
    this.folderService.getFoldersForCurrentUser().subscribe(
      folders => {
        this.folders = folders;
        this.dataSource.data = folders;
        this.dataSource.paginator = this.paginator;
        this.filteredFolders = [...this.folders]; // Initialiser filteredFolders avec tous les dossiers
      },
      error => {
        console.error('Error fetching folders:', error);
        // Handle the error here as needed
      }
    );
  }


  Openpopup(id?: any) {
    const _popup = this.dialog.open(PopupfolderComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id
      }
    });
    _popup.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.toastr.success('Folder operation successful!', 'Success');
      } else if (result === 'error') {
        this.toastr.error('Folder operation failed!', 'Error');
      }
      this.loadFolders();
    });
  }


  EditFolder(id: any) {
    this.Openpopup(id);
  }

  RemoveFolder(id: any) {
    const confirmation = confirm('Are you sure you want to remove this folder?');
    if (confirmation) {
      this.folderService.deleteFolder(id).subscribe(
        (response) => {
          this.toastr.success('Folder removed successfully!', 'Success');
          this.loadFolders();
        },
        (error) => {
          this.toastr.error('Failed to remove folder!', 'Error');
        }
      );
    }
  }



  SeeDetails(folderId: number): void {
    this.router.navigate(['/folder-details', folderId]);
  }


  searchFolders() {
    if (this.searchText.trim() !== '') {
      // Effectuer la recherche uniquement si le champ de recherche n'est pas vide
      this.filteredFolders = this.folders.filter(folder =>
        folder.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      // Si le champ de recherche est vide, afficher tous les dossiers
      this.filteredFolders = [...this.folders];
    }
    // Mettre à jour le MatTableDataSource avec les résultats filtrés
    this.dataSource.data = this.filteredFolders;
  }

}
