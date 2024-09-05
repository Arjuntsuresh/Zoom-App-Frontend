import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { searchData } from '../model/searchData';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  applyZoom(data:searchData):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/create-zoom-meeting`,data)
  }
  getToken(token:any):Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/${token}`);
  }
}
