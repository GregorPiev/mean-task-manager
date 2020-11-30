import { Component, OnInit } from '@angular/core';
import { TaskVO } from 'src/app/vo/task-vo';
import { TaskModel } from './../../model/task.model';
import { TaskService } from './../../services/task.service';
import { TaskFilterVo } from './../../vo/task-filter-vo';


@Component({
  selector: 'app-task-grid',
  templateUrl: './task-grid.component.html',
  styleUrls: ['./task-grid.component.css']
})
export class TaskGridComponent implements OnInit {
  public tasks: TaskVO[];
  public taskLoadError: string;
  taskFilter: TaskFilterVo = new TaskFilterVo();

  constructor(
    private taskModel: TaskModel,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    /*  this.taskService.loadTasksOnStart()
       .subscribe(list => {
         console.log('Tasks list:', list);
         this.tasks = list;
       }); */

    this.taskFilter.completed = null;
    // this.taskFilter.startDate = new Date('2020, 07, 01');
    this.taskLoadError = '';

    this.taskService.loadTasks(this.taskFilter)
      .subscribe(result => {
        if (result.error) {
          this.taskLoadError = 'We could not load any tasks.';
          return;
        }
        console.log('Tasks list:', result);

        this.tasks = this.taskModel.tasks = result as TaskVO[];
      },
        error => {
          this.taskLoadError = 'We had an error loading tasks.';
        }
      );
  };
}
