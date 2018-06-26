import { Pipe, PipeTransform } from '@angular/core';
import { TaskModel } from '../Model/task-model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: TaskModel[], taskSearch: string, parentTaskSearch: string,
    prioritySearch: number, prioritySearch1: number, startDateSearch: string,
     endDateSearch: string): TaskModel[] {
       if (!taskSearch && !parentTaskSearch && !prioritySearch && !prioritySearch1 && !startDateSearch && !endDateSearch ) {
          return value;
       }
       if (value && value.length) {
        return value.filter(item => {
            if (taskSearch && item.Task.toLowerCase().indexOf(taskSearch.toLowerCase()) === -1) {
                return false;
            }
            if (parentTaskSearch && item.ParentTask.toLowerCase().indexOf(parentTaskSearch.toLowerCase()) === -1) {
                return false;
            }
            if (startDateSearch && item.StartDate.toString().substring(0, 10)
              .indexOf(startDateSearch) === -1) {
              return false;
            }
            if (endDateSearch && item.EndDate.toString().substring(0, 10)
              .indexOf(endDateSearch) === -1) {
              return false;
            }

            if (prioritySearch && prioritySearch1 && !(item.Priority >= prioritySearch && item.Priority <= prioritySearch1) ) {
              return false;
            }
            return true;
       });
    } else {
        return value;
    }
  }

}
