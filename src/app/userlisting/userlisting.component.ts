import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateuserpopupComponent } from '../updateuserpopup/updateuserpopup.component'
import {ToastrService} from "ngx-toastr";
import {DocumentService} from "../service/document.service";
import {FolderService} from "../service/folder.service";
import {Folder} from "../model/folder.model";
import {User} from "../model/user.model";


@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrls: ['./userlisting.component.css']
})

export class UserlistingComponent implements AfterViewInit {

  searchText: string = '';
  users: User[] = [];
  filteredUsers: User[] = [];

  constructor(private builder: FormBuilder,
              private toastr: ToastrService,
              private service: AuthService,
              private documentService: DocumentService,
              private folderService: FolderService,
              private dialog: MatDialog) {
    this.LoadUser();
  }
  userlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {

  }

  LoadUser() {
    this.service.Getall().subscribe((res: any) => {
      this.users = res;
      this.filteredUsers = [...this.users]; // Copiez les utilisateurs filtrés également
      this.dataSource = new MatTableDataSource(this.filteredUsers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }




  displayedColumns: string[] = ['username', 'name', 'email', 'status', 'role', 'action'];

  updateuser(code: any) {
    this.OpenDialog('1000ms', '600ms', code);
  }

  OpenDialog(enteranimation: any, exitanimation: any, code: string) {
    const popup = this.dialog.open(UpdateuserpopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '30%',
      data: {
        usercode: code
      }
    });
    popup.afterClosed().subscribe(res => {
      this.LoadUser();
    });
  }

  RemoveUser(id: any) {
    const confirmation = confirm('Are you sure you want to remove this user?');
    if (confirmation) {
            this.service.deleteUser(id).subscribe(
        (response) => {
          this.toastr.success('User removed successfully!', 'Success');
          this.LoadUser();
        },
        (error) => {
          this.toastr.error('Failed to remove user!', 'Error');
        }
      );

    }
  }


  searchUsers() {
    if (this.searchText.trim() !== '') {
      this.filteredUsers = this.users.filter(user =>
        user.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchText.toLowerCase())
      );
      this.dataSource = new MatTableDataSource(this.filteredUsers);
    } else {
      this.dataSource = new MatTableDataSource(this.users);
    }
  }



}
