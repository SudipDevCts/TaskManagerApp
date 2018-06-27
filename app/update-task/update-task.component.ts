import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskModel } from '../Model/task-model';
import { TaskManagerService } from '../SharedServices/task-manager.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  constructor(private taskService: TaskManagerService,
    private route: ActivatedRoute,
    private router: Router) { }
  updateTaskForm: FormGroup;
  formSubmitted = false;
  taskModel: TaskModel ;
  tasks: TaskModel[] ;
  isDataLoaded = false;
  ngOnInit() {
    this.PopulateDropdown();
    const taskid: number = this.route.snapshot.params.taskid;
     this.taskService.GetTask(taskid).subscribe(
      restItems => {
        this.taskModel = restItems;
        if (this.taskModel) {
            this.updateTaskForm = new FormGroup ({
            Task: new FormControl(this.taskModel.Task, Validators.required),
            Priority: new FormControl(this.taskModel.Priority, Validators.min(1)),
            ParentTask: new FormControl(this.taskModel.ParentTask),
            StartDate: new FormControl(new Date(this.taskModel.StartDate).toISOString().substring(0, 10), Validators.required),
            EndDate : new FormControl(new Date(this.taskModel.EndDate).toISOString().substring(0, 10), Validators.required)
        }) ;
        this.isDataLoaded = true;
      }
      }
    );
}

PopulateDropdown() {
  this.taskService.GetTasks().subscribe(
    restItems => {
      this.tasks = restItems;
    }
  );
}

onFormSubmit() {
  if (!this.updateTaskForm.invalid) {
    this.taskModel.Task = this.updateTaskForm.value.Task;
    this.taskModel.Priority = this.updateTaskForm.value.Priority;
    this.taskModel.ParentTask = this.updateTaskForm.value.ParentTask;
    this.taskModel.StartDate = this.updateTaskForm.value.StartDate;
    this.taskModel.EndDate = this.updateTaskForm.value.EndDate;
    this.taskService.UpdateTask(this.taskModel).subscribe(result => {this.router.navigate(['']); });
    // this.addTaskService.AddTask(this.taskModel);
    // this.router.navigate(['']);


  }
}
}
