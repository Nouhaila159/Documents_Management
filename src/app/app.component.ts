import { Component,DoCheck } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'gestion-documents-angular';
  isadmin=false;
  isuser=false;
  isMenuVisible=false;
  username: any;
  constructor(private route:Router){
    let role=sessionStorage.getItem('role');
    if(role=='admin'){
      this.isadmin=true;
      this.isuser=false;
    }else{
      this.isadmin=false;
      this.isuser=true;
    }
  }
  ngDoCheck(): void {
    let currentroute = this.route.url;
    let role=sessionStorage.getItem('role');
    this.username = sessionStorage.getItem('username');
    if (currentroute == '/login' || currentroute == '/register') {
      this.isMenuVisible = false
    } else {
      this.isMenuVisible = true
    }

    if (role == 'admin') {
      this.isadmin = true;
      this.isuser=false;
    }else{
      this.isadmin=false;
      this.isuser=true;
    }
  }
}

