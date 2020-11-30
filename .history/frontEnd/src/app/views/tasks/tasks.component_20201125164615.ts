import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    /* this.taskService.loadTasksOnStart()
      .subscribe(item => {
        console.log('Item:', item);
      }); */

  }

}
