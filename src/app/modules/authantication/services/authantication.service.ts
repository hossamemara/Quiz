import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient }  from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthanticationService {

  constructor(private _HttpClient:HttpClient) { }
  userInfo = new BehaviorSubject(null);
  registerUser(model:any):Observable<any>
  {
    debugger;
    console.log(model);
    return this._HttpClient.post(`${environment.baseUrl}/students`,model);
  }

  getusers(roleType:any):Observable<any>
  {
    debugger;
    console.log(roleType);
    return this._HttpClient.get(`${environment.baseUrl}/${roleType}`);
  }
  login(model:any):Observable<any>
  {
    debugger;
    console.log(model);
    return this._HttpClient.put(`${environment.baseUrl}/loginUser/1`,model);
  }

  getRole():Observable<any>
  {
    return this._HttpClient.get(`${environment.baseUrl}/loginUser/1`);
  }

  getStudentData(id:number):Observable<any>
  {
    debugger;
    return this._HttpClient.get(`${environment.baseUrl}/students/${id}`);
  }


}
