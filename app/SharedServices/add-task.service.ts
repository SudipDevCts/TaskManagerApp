import { Injectable } from '@angular/core';

import { TaskModel } from '../Model/task-model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AddTaskService {

  constructor(private http: HttpClient) { this.requestUrl = 'http://localhost:9666/api/AddTask'; }
   requestUrl: string;
  AddTask(taskObj: TaskModel) {
    return this.http.post(this.requestUrl, (taskObj)
    );
  }
}





