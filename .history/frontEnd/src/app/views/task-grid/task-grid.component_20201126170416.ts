import { Component, OnInit } from '@angular/core';
import { TaskVO } from 'src/app/vo/task-vo';
import { TaskModel } from './../../model/task.model';
import { TaskService } from './../../services/task.service';
import { TaskFilterVo } from './../../vo/task-filter-vo';
import { FlashMessagesService } from 'angular2-flash-messages';

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
    private taskService: TaskService,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit(): void {
    // this.taskFilter.completed = false;
    // this.taskFilter.startDate = new Date('2020, 03, 28');
    this.taskLoadError = '';

    this.taskService.loadTasks(this.taskFilter)
      .subscribe(result => {
        if (result.error) {
          this.taskLoadError = 'We could not load any tasks.';
          this.flashMessagesService.show(this.taskLoadError, { cssClass: 'alert-danger', timeout: 3000 });
          return;
        }
        console.log('Tasks list:', result);

        this.tasks = this.taskModel.tasks = result as TaskVO[];
      },
        error => {
          this.taskLoadError = 'We had an error loading tasks.';
          this.flashMessagesService.show(this.taskLoadError, { cssClass: 'alert-danger', timeout: 3000 });
        }
      );
  };
}
