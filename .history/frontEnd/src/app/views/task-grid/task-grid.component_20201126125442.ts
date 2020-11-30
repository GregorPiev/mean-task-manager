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
    this.taskService.loadTasksOnStart()
      .subscribe(list => {
        console.log('Tasks list:', list);
        this.tasks = list;
      });

    this.taskFilter.completed = false;
    this.taskFilter.startDate = new Date('20/07/2020');
    this.taskLoadError = '';

  }

}
