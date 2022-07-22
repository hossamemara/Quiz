import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent implements OnInit {
  stepperIndex = 0;
  startAdd: boolean = false;
  preview: boolean = false;
  subjectName: any = ''
  correctAnswer: any;
  questions: any[] = [];
  questionForm!: FormGroup;
  questionId:any;
  constructor(private _FormBuilder: FormBuilder, private _ToastrService: ToastrService,private _DoctorService:DoctorService) { }
  clearForm() {
    this.questionForm.reset();
  }
  deleteQuestion(index:any)
  {
    this.questions.splice(index,1);
    const model = 
    {
      name : this.subjectName,
      questions : this.questions
    }
    this._DoctorService.deleteQuestion(model,this.questionId).subscribe((data:any)=>
    {
      console.log(data);
    })
    

  }
  saveSubject()
  {
    const model = 
    {
      name : this.subjectName,
      questions : this.questions
    }
    
    if (this.preview)
    {
      this.stepperIndex = 2 ;
    }

    else
    {
      this._DoctorService.createSubject(model).subscribe((data:any)=>
      {
        debugger;
        console.log(data);
        this.questionId = data.id;
        
        this.preview = true;
      })
    }
    

  }
  cancelForm() {

    this.questionForm.reset();
    this.stepperIndex = 0;
    this.startAdd = false;
    this.subjectName = '';
    this.questions = [];
  }
  saveQuestion() {
    debugger;
    if (this.correctAnswer) {
      debugger;
      const model = {
        question: this.questionForm.value.question,
        answer1: this.questionForm.value.answer1,
        answer2: this.questionForm.value.answer2,
        answer3: this.questionForm.value.answer3,
        answer4: this.questionForm.value.answer4,
        correctAnswer: this.questionForm.value[this.correctAnswer]
      }
      this.questions.push(model)
      this.questionForm.reset()
    }
    else {
      debugger;
      this._ToastrService.error("يرجي اختبار الاجابة الصحيحه")
    }
    console.log(this.questions)
  }
  getCorrectAnswer(event: any) {
    debugger;
    this.correctAnswer = event.value
  }
  createQuestionForm() {
    this.questionForm = this._FormBuilder.group({
      question: ['', [Validators.required]],
      answer1: ['', [Validators.required]],
      answer2: ['', [Validators.required]],
      answer3: ['', [Validators.required]],
      answer4: ['', [Validators.required]]
    })
  }
  start() {
    if (this.subjectName == "") {
      debugger;
      this._ToastrService.error("يرجي ادخال اسم المادة")
    }
    else {
      debugger;
      this.stepperIndex = 1;
      this.startAdd = true;

      console.log(this.subjectName);

    }
  }
  ngOnInit(): void {
    this.createQuestionForm();
  }

}
