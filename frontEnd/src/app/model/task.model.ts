import { Injectable } from '@angular/core';
import { TaskVO } from './../vo/task-vo';
import { CompletedOptionVo } from './../vo/completed-option-vo';
import { TaskCategoryVO } from './../vo/task-category-vo';

@Injectable({
  providedIn: 'root'
})
export class TaskModel {
  tasks: TaskVO[];
  taskCategories: TaskCategoryVO[];
  taskCompletedOptions: CompletedOptionVo[] = [
    new CompletedOptionVo(-1, 'All', null),
    new CompletedOptionVo(0, 'Open Tasks', false),
    new CompletedOptionVo(1, 'Completed Tasks', true)
  ]
}
