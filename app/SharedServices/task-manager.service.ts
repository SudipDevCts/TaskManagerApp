
import { TaskModel } from '../Model/task-model';
import { Injectable } from '@angular/core';

import {Http, Response} from '@angular/http';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {
  getTasksrequestUrl: string;
  endTaskUrl: string;
  getSpecificTask: string;
  updTask: string;
  getDropdown: string;
  constructor(private http: HttpClient) {
    this.getTasksrequestUrl = 'http://localhost:9666/api/GetTask';
    this.endTaskUrl = 'http://localhost:9666/api/EndTask';
    this.getSpecificTask = 'http://localhost:9666/api/Task/';
    this.updTask = 'http://localhost:9666/api/UpdateTask/';
   }


   GetTasks() {
    return this.http
    .get<any[]>(this.getTasksrequestUrl)
    .pipe(map(data => data));
  }

  EndTask(endTask: TaskModel) {
    return this.http.put(this.endTaskUrl, endTask);
  }

  GetTask(taskId: number) {
    return this.http
    .get<TaskModel>(this.getSpecificTask + taskId)
    .pipe(map(data => data));
  }
  UpdateTask(updTask: TaskModel) {
    return this.http.post(this.updTask, updTask);
  }
}
