import { Component, OnInit } from '@angular/core';
import { TaskVO } from 'src/app/vo/task-vo';
import { TaskModel } from './../../model/task.model';
import { TaskService } from './../../services/task.service';


@Component({
  selector: 'app-task-grid',
  templateUrl: './task-grid.component.html',
  styleUrls: ['./task-grid.component.css']
})
export class TaskGridComponent implements OnInit {
  public tasks: TaskVO[];


  constructor(
    private taskModel: TaskModel,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.taskService.loadTasksOnStart()
      .subscribe(list => {
        console.log('Tasks list:', list)
      });
  }

}
