import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskModel } from '../Model/task-model';
import { AddTaskService } from '../SharedServices/add-task.service';
import { Router } from '@angular/router';
import { TaskManagerService } from '../SharedServices/task-manager.service';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor(private addTaskService: AddTaskService,  private taskService: TaskManagerService, private router: Router) {
    this.taskModel = {Task : '', Priority: 0, ParentTask: '', StartDate: '', EndDate: '', TaskId: 0, ParentTaskId: 0, IsEditable: true};
   }
  addTaskForm: FormGroup;
  formSubmitted = false;
  taskModel: TaskModel ;
  tasks: TaskModel[] ;
  ngOnInit() {
    this.addTaskForm = new FormGroup ({
      Task: new FormControl('', Validators.required),
      Priority: new FormControl(1, Validators.min(1)),
      ParentTask: new FormControl(''),
      StartDate: new FormControl('', Validators.required),
      EndDate : new FormControl('', Validators.required)

});
this.PopulateDropdown();
  }

  onFormSubmit() {
    this.formSubmitted = true;
    if (!this.addTaskForm.invalid) {
      this.taskModel.Task = this.addTaskForm.value.Task;
      this.taskModel.Priority = this.addTaskForm.value.Priority;
      this.taskModel.ParentTask = this.addTaskForm.value.ParentTask;
      this.taskModel.StartDate = this.addTaskForm.value.StartDate;
      this.taskModel.EndDate = this.addTaskForm.value.EndDate;
      this.addTaskService.AddTask(this.taskModel).subscribe(result => {this.router.navigate(['']); });
    }
  }
  Reset() {
    this.addTaskForm.reset();
  }

  PopulateDropdown() {
    this.taskService.GetTasks().subscribe(
      restItems => {
        this.tasks = restItems;
      }
    );
  }

}
