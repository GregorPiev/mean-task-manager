import { Injectable } from '@angular/core';
import { TaskVO } from './../vo/task-vo';
import { CompletedOptionVo } from './../vo/completed-option-vo';

@Injectable({
  providedIn: 'root'
})
export class TaskModel {
  tasks: TaskVO[];
  taskCompletedOptions: CompletedOptionVo[] = [
    new CompletedOptionVo(-1, 'All', null),
    new CompletedOptionVo(0, 'Open Tasks', false),
    new CompletedOptionVo(1, 'Completed Tasks', true)
  ]
}
