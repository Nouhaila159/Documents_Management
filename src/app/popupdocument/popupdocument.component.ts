import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentService } from "../service/document.service";
import { ToastrService } from "ngx-toastr";
import {FolderService} from "../service/folder.service";

// Fonction de validation personnalisée pour s'assurer que la valeur est un nombre
function isNumber(control: AbstractControl): { [key: string]: any } | null {
  const value = control.value;
  if (isNaN(Number(value))) {
    return { 'notANumber': true };
  }
  return null;
}

@Component({
  selector: 'app-popupdocument',
  templateUrl: './popupdocument.component.html',
  styleUrls: ['./popupdocument.component.css']
})
export class PopupdocumentComponent implements OnInit {
  editData: any;
  folders: any[] = []; // Add folders array

  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    private api: DocumentService,
    private toastr: ToastrService,
    private folderService:FolderService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // Load folders when the pop-up is initialized
    this.folderService.getFoldersForCurrentUser().subscribe(folders => {
      this.folders = folders;
      this.updateForm();
    });
  }

  updateForm() {
    if (this.data.id !== '' && this.data.id !== null) {
      this.api.getDocumentById(this.data.id).subscribe(response => {
        this.editData = response;
        this.documentForm.setValue({
          id: this.editData.id,
          title: this.editData.title,
          path: "/path/to/" + this.editData.title,
          type: this.editData.type,
          sizeInBytes: this.editData.sizeInBytes,
          ownerId: this.editData.ownerId,
          folderId: this.editData.folderId,
          lastModified: this.editData.lastModified,
        });
      });
    }
  }

  documentForm = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    title: this.builder.control('', Validators.required),
    path: this.builder.control(''),
    type: this.builder.control('', Validators.required),
    sizeInBytes: this.builder.control('', [Validators.required, isNumber]),
    ownerId: this.builder.control(sessionStorage.getItem("username")),
    folderId: this.builder.control(''),
    lastModified: this.builder.control(''),
  });

  saveDocument() {
    if (this.documentForm.valid) {
      const editId = this.documentForm.getRawValue().id;

      // Mettez à jour la propriété lastModified avec la date et l'heure actuelles
      this.documentForm.patchValue({
        lastModified: new Date().toISOString(),
      });

      const selectedFolder = this.folders.find(folder => folder.id === this.documentForm.getRawValue().folderId);

      this.documentForm.patchValue({
        path: (selectedFolder)
          ? `/Desktop/${selectedFolder.name}/${this.documentForm.getRawValue().title}`
          : `/Desktop/${this.documentForm.getRawValue().title}`,
      });

      console.log('Form data:', this.documentForm.value);

      if (editId !== '' && editId !== null) {
        console.log('Updating document with ID:', editId);
        this.api.updateDocument(editId, this.documentForm.getRawValue()).subscribe(response => {
          this.closePopup();
          this.toastr.success('Document updated successfully.');
        });
      } else {
        console.log('Adding new document:', this.documentForm.value);
        this.api.addDocument(this.documentForm.value).subscribe(response => {
          this.closePopup();
          this.toastr.success('Document saved successfully.');
        });
      }
    } else {
      console.log('Form is not valid.');
    }
  }

  closePopup() {
    this.dialog.closeAll();
  }
}
