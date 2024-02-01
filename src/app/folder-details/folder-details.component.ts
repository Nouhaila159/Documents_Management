import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FolderService } from '../service/folder.service';
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {DocumentService} from "../service/document.service";

@Component({
  selector: 'app-folder-details',
  templateUrl: './folder-details.component.html',
  styleUrls: ['./folder-details.component.css']
})
export class FolderDetailsComponent implements OnInit {
  folderDetails: any;

  constructor(
    private route: ActivatedRoute,
    private folderService: FolderService,
    private documentService: DocumentService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
   this.refreshFolderDetails();
  }
  refreshFolderDetails(){
    // Get folder ID from the route parameters
    const folderIdParam = this.route.snapshot.paramMap.get('id');

    // Check if folderIdParam is not null before converting to a number
    if (folderIdParam !== null) {
      const folderId = +folderIdParam; // Convert to number

      // Call the service method to get folder details
      this.folderService.getFolderDetails(folderId).subscribe(
        (result) => {
          this.folderDetails = result;
        },
        (error) => {
          console.error('Error fetching folder details:', error);
        }
      );
    } else {
      console.error('Folder ID is null.');
    }
  }
  detachDocument(documentId: number) {
    this.documentService.detachDocument(documentId).subscribe(
      () => {
        this.refreshFolderDetails();
      },
      (error) => {
        console.error('Error detaching document:', error);
      }
    );
  }

}



