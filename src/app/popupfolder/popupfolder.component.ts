// popupfolder.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FolderService } from '../service/folder.service';

@Component({
  selector: 'app-popupfolder',
  templateUrl: './popupfolder.component.html',
  styleUrls: ['./popupfolder.component.css']
})
export class PopupfolderComponent implements OnInit {
  editData: any;

  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    private folderService: FolderService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.updateForm();
  }

  updateForm() {
    if (this.data.id !== '' && this.data.id !== null) {
      this.folderService.getFolderById(this.data.id).subscribe(response => {
        this.editData = response;
        this.folderForm.setValue({
          id: this.editData.id,
          name: this.editData.name,
          ownerId: this.editData.ownerId,
          lastModified: this.editData.lastModified
        });
      });
    }
  }

  folderForm = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    name: this.builder.control('', Validators.required),
    ownerId: this.builder.control(sessionStorage.getItem('username')),
    lastModified: this.builder.control(''),
  });

  saveFolder() {
    if (this.folderForm.valid) {
      const editId = parseInt(<string>this.folderForm.getRawValue().id, 10);

      this.folderForm.patchValue({
        lastModified: new Date().toISOString(),
      });

      console.log('Form data:', this.folderForm.value);

      if (!isNaN(editId)) {
        if (editId !== null) {
          console.log('Updating document with ID:', editId);
          this.folderService.updateFolder(editId, this.folderForm.getRawValue()).subscribe(response => {
            this.closePopup();
            this.toastr.success('Document updated successfully.');
          });
        }
      }
      else {
        console.log('Adding new folder:', this.folderForm.value);
        this.folderService.addFolder(this.folderForm.value).subscribe(response => {
          this.closePopup();
          this.toastr.success('Folder added successfully.');
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
