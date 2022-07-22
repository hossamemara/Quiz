import { Component, OnInit } from '@angular/core';
import { AuthanticationService } from 'src/app/modules/authantication/services/authantication.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  displayedColumns: any
  dataSource: any[] = [];
  datatable: any;
  constructor(private _AuthanticationService: AuthanticationService) {
    this.displayedColumns = ['position', 'name', 'subjectName', 'degree','email'];
  }

  ngOnInit(): void {
    this.getStudents()
  }


  getStudents() {
    this._AuthanticationService.getusers("students").subscribe(((data: any) => {
      debugger;
      console.log(data);
      this.dataSource = data?.map((student: any) => {
        if(student?.studentSubject)
        {
          return student?.studentSubject?.map((sub: any) => {
            return {
              name: student.userName,
              subjectName: sub.name,
              degree: sub.degree,
              email :student.email
            }
          })
        }
        else
        {
          return [
            {
              name: student.userName,
              subjectName:"-",
              degree: "-",
              email :"-"
            }
          ]
        }
       
      })
      console.log(this.dataSource);
      this.datatable = [];
      this.dataSource.forEach((item:any)=>
      {
        item.forEach((subItem:any)=>
        {
           this.datatable?.push({
            name:subItem.name,
            subjectName:subItem.subjectName,
            degree:subItem.degree,
            email :subItem.email
          });
        })
      })
      console.log(this.datatable);
    }))
  }


}
