import { Component, OnInit } from '@angular/core';
import { TaskVO } from 'src/app/vo/task-vo';
import { TaskModel } from './../../model/task.model';


@Component({
  selector: 'app-task-grid',
  templateUrl: './task-grid.component.html',
  styleUrls: ['./task-grid.component.css']
})
export class TaskGridComponent implements OnInit {
  public tasks: TaskVO[];


  constructor(private taskModel: TaskModel) { }

  ngOnInit(): void {
  }

}
