import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  public documentState : any ={
    documents : [],
    keyword : "",
    totalPages:0,
    pageSize:3,
    currentPage:1,
    totalDocuments:0,
    status : "",
    errorMessage : ""
  }
  public authState: any={
    isAuthenticated : false,
    username:undefined,
    roles:undefined,
    token : undefined
  };
  constructor() { }

  public setDocumentState(state : any): void {
    this.documentState={...this.documentState, ...state}
  }

  public setAuthState(state : any):void{
    this.authState={...this.authState,...state};
  }
}
