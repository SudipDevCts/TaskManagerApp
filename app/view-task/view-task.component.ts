import { Component, OnInit } from '@angular/core';
import { TaskManagerService } from '../SharedServices/task-manager.service';
import { TaskModel } from '../Model/task-model';
import { Router } from '@angular/router';
import {SearchPipe} from '../filter/search.pipe';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  constructor(private taskService: TaskManagerService, private router: Router) { }
   tasks: TaskModel[] ;
   dropDownList: TaskModel[] ;
   endTask: TaskModel;
   initialized: boolean;
   taskSearch: string;
   parentTaskSearch: string;
   prioritySearch: string;
   prioritySearch1: string;
   startDateSearch: string;
   endDateSearch: string;
  ngOnInit() {
    this.Initialize();
  }
  EndTask(task: any) {
    this.endTask = this.tasks.filter(x => x.TaskId === task )[0];
    this.taskService.EndTask(this.endTask).subscribe(
      res => {
        this.Initialize();
      },
      err => {
        this.Initialize();
      }
    );
  }

  EditTask(taskId: number) {
    this.router.navigate(['Edit', {taskid : taskId}]);
  }

  Initialize() {
    this.taskService.GetTasks().subscribe(
      restItems => {
        this.tasks = restItems;
        this.initialized = true;
      }
    );

  }

}
