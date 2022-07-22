import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/authantication/components/login/login.component';
import { RegisterComponent } from './modules/authantication/components/register/register.component';
import { NewExamComponent } from './modules/doctor/components/new-exam/new-exam.component';
import { StudentsComponent } from './modules/doctor/components/students/students.component';
import { SubjectsComponent } from './modules/doctor/components/subjects/subjects.component';
import { ExamComponent } from './modules/student/component/exam/exam.component';

const routes: Routes = [
  {path:'' , redirectTo:'subjects' , pathMatch:'full'},
  {path:'login' , component:LoginComponent},
  {path:'register' , component:RegisterComponent},
  {path:'exam/:id' , component:ExamComponent},
  {path:'students' , component:StudentsComponent},
  {path:'subjects' , component:SubjectsComponent},
  {path:'new-exam' , component:NewExamComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
