import { Component, OnInit } from '@angular/core';
import { AuthanticationService } from './modules/authantication/services/authantication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private _AuthanticationService:AuthanticationService)
  {
    
  }
  ngOnInit(): void {
    this.getUserDate()
  }


  getUserDate() {
    this._AuthanticationService.getRole().subscribe(data => {
      this._AuthanticationService.userInfo.next(data);
    }) 
  }

}



