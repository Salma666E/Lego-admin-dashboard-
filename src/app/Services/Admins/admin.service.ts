import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAdmin } from 'src/app/ViewModels/IAdmin';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  getAllAdmins() : Observable<IAdmin[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        // Authorization: 'my-auth-token'
      })
    };
    
    return this.http.get<IAdmin[]>(`${environment.API_Link}/admins`, httpOptions);
  }

  addAdmin(admin: IAdmin):Observable<any>
  {
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json'
      //,'Accept':' */*'
      //,'Authorization': 'my-auth-token'
        })};
        
    return this.http.post<any>(`${environment.API_Link}/admins`,admin, httpOptions);
  }

  deleteAdmin(admin: number):Observable<any>
  {
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json'
      //,'Accept':' */*'
      //,'Authorization': 'my-auth-token'
        })};
        
    return this.http.delete<any>(`${environment.API_Link}/admins/${admin}`, httpOptions);
  }
  
  getAdminByID(pID:number): Observable<IAdmin>{
    return this.http.get<IAdmin>(`${environment.API_Link}/admins/${pID}`);
  } 
}
