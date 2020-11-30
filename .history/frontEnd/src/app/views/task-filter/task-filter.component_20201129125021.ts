import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { TaskModel } from './../../model/task.model';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.css']
})
export class TaskFilterComponent implements OnInit {
  filterError: string;

  constructor(
    private taskModel: TaskModel,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.filterError = 'dfgdfg ddfgdfgdfg';
  }

}
