import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {DataService} from "../service/data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isadmin = false;
  isuser = false;
  username: any;
  name:any;
  userEmail:any;
  userGender:any;
  userCount = 0;
  activeUserCount = 0;
  inactiveUserCount = 0;
  adminCount = 0;
  documentCount = 0;
  folderCount = 0;

  constructor(private route: Router, private dataService: DataService) {
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.setUsername();
    this.setUserRole();
    this.loadDataCounts();
  }

  setUsername() {
    this.username = sessionStorage.getItem('username');
  }

  setUserRole() {
    let role = sessionStorage.getItem('role');
    this.isuser = role === 'user';
    this.isadmin = role === 'admin';
  }

  loadDataCounts() {
    if (this.isadmin) {
      this.dataService.getAllUsers().subscribe(
        (data: any) => {
          console.log(this.isadmin);
          console.log(data);
          this.userCount = data.filter((user: any) => user.role === 'user').length;
          this.activeUserCount = data.filter((user: any) => user.isactive).length;
          this.inactiveUserCount = data.filter((user: any) => !user.isactive).length;
          this.adminCount = data.filter((user: any) => user.role === 'admin').length;
        },
        (error: any) => {
          // Handle error if needed
          console.error(error);
        }
      );
    } else if (this.isuser) {
      this.dataService.getDocumentsForCurrentUser().subscribe((documents: any[]) => {
        this.documentCount = documents.length;
      });

      this.dataService.getFoldersForCurrentUser().subscribe((folders: any[]) => {
        this.folderCount = folders.length;
      });

      this.dataService.getUserData(this.username).subscribe((userData: any) => {
        this.name = userData.name;
        this.userEmail = userData.email;
        this.userGender = userData.gender;
      });
    }
  }

}


