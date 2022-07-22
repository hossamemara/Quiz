import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthanticationService } from '../../services/authantication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  roleType:string = 'students';
  users:any [] = [];
  
  constructor(private _ToastrService:ToastrService,private _FormBuilder:FormBuilder,private _AuthanticationService:AuthanticationService,private _Router:Router) { }
  submitLogin()
  {
   
    debugger;
    let index = this.users.findIndex(item=>item.email == this.loginForm.value.email && item.password == this.loginForm.value.password);
    console.log(index);
    
    if (index == -1)
    {
      this._ToastrService.error('الايميل او كلمة المرور غير صحيحة', "" , {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut:5000,
        closeButton: true,
      })
    }
    else
    {

      debugger;
      
      
      const model ={
        roleType :this.loginForm.value.roleType,
        userName:this.users[index].userName,
        userId:this.users[index].id
      }
      
      console.log(model);
      this._AuthanticationService.login(model).subscribe((data)=>
      {
        
        debugger;
         this._AuthanticationService.userInfo.next(data)
        
        console.log(data);
        this._ToastrService.success('تم تسجيل الدخول بنجاح', "" , {
          disableTimeOut: false,
          titleClass: "toastr_title",
          messageClass: "toastr_message",
          timeOut:2000,
          closeButton: true,
        });
        
        this._Router.navigate(['./subjects']);
      })
    }
   
  }
  createForm()
  {
    this.loginForm = this._FormBuilder.group(
      {
        roleType:[this.roleType],
        email:[null,[Validators.email,Validators.required]],
        password:[null,Validators.required]
      }
    )
  }

  getRole(event:any)
  {
   debugger;
   console.log(event.value);
   this.roleType = event.value;
   this.getusers(); 
  }

  getusers()
  {
    this._AuthanticationService.getusers(this.roleType).subscribe((data:any)=>
    {
      console.log(data);
      this.users = data;
      

    })
  }

  
  ngOnInit(): void {
  this.createForm();
  this.getusers();
   
  }

}
