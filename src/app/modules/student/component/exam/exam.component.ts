import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthanticationService } from 'src/app/modules/authantication/services/authantication.service';
import { DoctorService } from 'src/app/modules/doctor/services/doctor.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  id:any;
  exams:any;
  user:any;
  total:number = 0;
  resultFlag:boolean = false;
  validExam:boolean = true;
  studentData :any ;
  userSubjects:any [] = [];
  constructor(private _ToastrService: ToastrService,private _ActivatedRoute: ActivatedRoute,private _DoctorService:DoctorService,private _AuthanticationService:AuthanticationService) { }
  
  getUserInfo()
  {
    debugger;
    this._AuthanticationService.userInfo.subscribe((data:any)=>
    {
      debugger;
      console.log(data);
      if (data?.roleType)
      {
        this.user = data;
        this.getStudentById();
      }
      
      
    })
  }
  

  checkExamValidation()
  {
    debugger;
    for (let i in this.userSubjects)
    {

      if(this.userSubjects[i].id == this.id)
      {
         this.validExam = false;
         this.total = this.userSubjects[i].degree;
         
         
      }
      
    }
    console.log(this.validExam);
  }
  getStudentById()
  {
    debugger;
    this._AuthanticationService.getStudentData(this.user.userId).subscribe((data)=>
    {
      debugger;
      console.log(data);
      this.studentData = data;
      this.userSubjects = data?.studentSubject ? data.studentSubject:[] 
      this.checkExamValidation();
    })
  }
  showSubject(id:any)
  {
    debugger;
    this._DoctorService.showSubject(id).subscribe((data:any)=>
    {
      debugger;
      console.log(data);
      this.exams = data
    })
  }

  getAnswer(event:any)
  {
    console.log(event);
    let questionIndex = event.source.name;
    this.exams.questions[questionIndex].studentAnswer= event.value;
    console.log(this.exams.questions)
  }

  showResult()
  {
    this.total = 0
    for (let i  in this.exams.questions)
    {
        if (this.exams.questions[i].correctAnswer == this.exams.questions[i].studentAnswer)
        {
          this.total++;
        }
        console.log(this.total);  
    }
    this.resultFlag = true;
    debugger;
    this.userSubjects.push(
      {
        name:this.exams.name,
          degree:this.total,
          id :this.id,
          email: this.studentData.email
      }
    )
    const model = 
    {
      userName: this.user.userName,
      email: this.studentData.email,
      password: this.studentData.password,
      studentSubject:this.userSubjects
    }

    this._DoctorService.saveStudentSubjectData(model,this.user.userId).subscribe((data:any)=>
    {
      debugger;
      console.log(data);
      this._ToastrService.success('تم اجتياز هذا الامتحان بنجاح',"", {
        timeOut: 2000
      })
    })
  }
  deleteQuestion(index:any)
  {
    debugger;
    
     this.exams.questions.splice(index,1);
     const model = 
     {
        name : this.exams.name,
        questions : this.exams.questions
     }
     this._DoctorService.deleteExamQuestion(model,this.id).subscribe((data:any)=>
     {
      debugger;
       console.log(data);
       this._ToastrService.success('تم حذف السؤال بنجاح',"", {
        timeOut: 1000
      })
     })
  }
  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.paramMap.get('id');
    this.showSubject(this.id);
    this.getUserInfo();
    

  }

}
