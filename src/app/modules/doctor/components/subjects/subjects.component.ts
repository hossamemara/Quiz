import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthanticationService } from 'src/app/modules/authantication/services/authantication.service';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  subjects:any [] = [];
  user :any  =null;
  constructor(private _ToastrService: ToastrService,private _DoctorService:DoctorService,private _AuthanticationService:AuthanticationService) { }

  ngOnInit(): void {
    this.getSubjects();
    this.getUserInfo();
    }

    deleteSubject(index:any)
    {  
      debugger;
      let id = this.subjects[index].id;
      this.subjects.splice(index , 1)
      this._DoctorService.deleteSubject(id).subscribe((data:any)=>
      {
        console.log(data);
      })
      this._ToastrService.success('تم حذف المادة بنجاح')
    }


    
    getUserInfo()
    {
      this._AuthanticationService.userInfo.subscribe((data:any)=>
      {
        debugger;
        console.log(data);
        if (data?.roleType)
        {
          this.user = data;
        }
        
        
      })
    }

  getSubjects()
  {
    this._DoctorService.getSubjects().subscribe(data=>
      {
        console.log(data);
        this.subjects= data;
      })
  }

}
