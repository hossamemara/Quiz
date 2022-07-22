import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthanticationService } from '../../authantication/services/authantication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user :any  =null;
  isLoggedIn: boolean = false;
  constructor(private _Router:Router,private _AuthanticationService:AuthanticationService) { }

  ngOnInit(): void {

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

  logout()
  {
    const model = {}
    this._AuthanticationService.login(model).subscribe((data:any)=>
    {
      this.user = null;
      this._AuthanticationService.userInfo.next(data);
      this._Router.navigate(['/login'])
    });
  }
}
