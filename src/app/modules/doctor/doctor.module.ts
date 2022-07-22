import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewExamComponent } from './components/new-exam/new-exam.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { StudentsComponent } from './components/students/students.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    NewExamComponent,
    SubjectsComponent,
    StudentsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DoctorModule { }
