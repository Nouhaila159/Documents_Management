import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from 'src/material.module';
import {HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserlistingComponent } from './userlisting/userlisting.component';
import { UpdateuserpopupComponent } from './updateuserpopup/updateuserpopup.component';
import {DocumentComponent} from './documents/documents.component';
import {DocumentService} from "./service/document.service";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { PopupdocumentComponent } from './popupdocument/popupdocument.component';
import { PopupfolderComponent } from './popupfolder/popupfolder.component';
import { FolderDetailsComponent } from './folder-details/folder-details.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {FoldersComponent} from "./folders/folders.component";



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserlistingComponent,
    UpdateuserpopupComponent,
    FoldersComponent,
    DocumentComponent,
    PopupdocumentComponent,
    PopupfolderComponent,
    FolderDetailsComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    ToastrModule.forRoot()
  ],
  providers: [
    DocumentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
