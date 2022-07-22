import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private _HttpClient:HttpClient) { }

  createSubject(model:any):Observable<any>
  {
    debugger;
    console.log(model);
    return this._HttpClient.post(`${environment.baseUrl}/subjects`,model);
  }

  deleteQuestion(model:any,id:any):Observable<any>
  {
    debugger;
    console.log(model);
    return this._HttpClient.put(`${environment.baseUrl}/subjects/${id}`,model);
  }

  getSubjects():Observable<any>
  {
    return this._HttpClient.get(`${environment.baseUrl}/subjects`);
  }
  deleteSubject(id:any):Observable<any>
  {
    return this._HttpClient.delete(`${environment.baseUrl}/subjects/${id}`);
  }
  deleteExamQuestion(model:any,id:any):Observable<any>
  {
    return this._HttpClient.put(`${environment.baseUrl}/subjects/${id}`,model);
  }
  showSubject(id:any):Observable<any>
  {
    debugger;
    return this._HttpClient.get(`${environment.baseUrl}/subjects/${id}`);
  }


  saveStudentSubjectData(model:any,id:any):Observable<any>
  {
    return this._HttpClient.put(`${environment.baseUrl}/students/${id}`,model);
  }
}
