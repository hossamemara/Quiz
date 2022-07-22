import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthanticationService } from '../../services/authantication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!:FormGroup;
  students :any [] = [];
  constructor(private _ToastrService:ToastrService,private _FormBuilder:FormBuilder,private _AuthanticationService:AuthanticationService,private _Router:Router)
  { }
  createForm()
  {
    this.registerForm = this._FormBuilder.group(
      {
        userName:[null,Validators.required],  
        email:[null,[Validators.email,Validators.required]],
        password:[null,Validators.required],
        confirmPassword:[null,Validators.required]
      }
    )
  }

  getStudents()
  {
    this._AuthanticationService.getusers('students').subscribe((data:any)=>
    {
      console.log(data);
      this.students = data;
      

    })
  }
  submitRegister()
  {
    debugger;
    const model = {
      userName:this.registerForm.value.userName,
      email:this.registerForm.value.email,
      password:this.registerForm.value.password
    }
    console.log(model);
    let index = this.students.findIndex(item=>item.email == this.registerForm.value.email);
    console.log(index);
    if(index != -1)
    {
      this._ToastrService.error('هذا الاميل موجود مسبقا', "" , {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut:5000,
        closeButton: true,
      })
        
    }
    else
    {
      this._AuthanticationService.registerUser(model).subscribe((data)=>
      {
        debugger;
        console.log(data);
        this._ToastrService.success('تم التسجيل بنجاح', "" , {
          disableTimeOut: false,
          titleClass: "toastr_title",
          messageClass: "toastr_message",
          timeOut:5000,
          closeButton: true,
        });
        
        this._Router.navigate(['./login']);
      });
    }
    





  }
  ngOnInit(): void {
    this.getStudents();
    this.createForm();
  }

}
