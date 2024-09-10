import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginDetails, searchData } from '../model/searchData';
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
  loginAdmin(loginData:loginDetails):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/admin/admin-login`,loginData);
  }
  getAllData():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/admin/get-all-data`);
  }
  deleteMeeting(id:any):Observable<any>{
    return this.http.delete<any>(`${environment.apiUrl}/admin/delete-meeting/${id}`);
  }
  getDataById(id:any):Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/admin/get-data-by-id/${id}`);
  }
  updateMeeting(id:any,data:any):Observable<any>{
    return this.http.put<any>(`${environment.apiUrl}/admin/update-meeting/${id}`,data);
  }
}
