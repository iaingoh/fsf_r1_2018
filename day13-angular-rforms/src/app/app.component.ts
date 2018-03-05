import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('taskFormRef') taskFormRef: NgForm;

  private taskListCtrl: FormArray;
  taskForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.taskListCtrl = this.fb.array([]);
    this.taskForm = this.fb.group({
      taskName: this.fb.control(null, Validators.required),
      dueDate: [ null, [Validators.required ]],
      taskList: this.taskListCtrl
      //dueDate: new FormControl(null, Validators.required)
      //taskList: new FormArray([])
    })
  }

  private createTaskControl(values: any): FormGroup {
    const fg =  this.fb.group({
        task: [ values.taskName ],
        ddate: [ values.dueDate ]
    });
    console.log('task control = ', fg);
    return (fg);
  }

  dumpTaskList() {
    for (let v of this.taskListCtrl.value) {
      console.log('>> taskListCtrl: ', v);
    }
  }

  addTaskToList() {
    console.log('>> taskForm: ', this.taskForm.value);
    const fg = this.createTaskControl(this.taskForm.value);
    let list = this.taskForm.get('taskList') as FormArray;
    list.push(fg);
    //this.taskListCtrl.push(fg);
  }
}
