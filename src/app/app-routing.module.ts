import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { CustomerComponent } from './customer/customer.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {UserlistingComponent} from "./userlisting/userlisting.component";
import {AuthGuard2} from "./guard/auth2.guard";
import {DocumentComponent} from "./documents/documents.component";
import {FoldersComponent} from "./folders/folders.component";
import {FolderDetailsComponent} from "./folder-details/folder-details.component";

const routes: Routes = [
  {component:LoginComponent,path:'login'},
  {component:RegisterComponent,path:'register'},
  {component:HomeComponent,path:'',canActivate:[AuthGuard]},
  {component:UserlistingComponent,path:'user',canActivate:[AuthGuard]},
  {component:DocumentComponent,path:'documents',canActivate:[AuthGuard2]},
  {component:FoldersComponent,path:'folders',canActivate:[AuthGuard2]},
  {path: 'folder-details/:id', component: FolderDetailsComponent ,canActivate:[AuthGuard2]},
  {path: 'detach/:id',component: FolderDetailsComponent,canActivate:[AuthGuard2]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
