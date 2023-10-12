// src/app/task-form/task-form.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  task: Task = { title: '', description: '', completed: false };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.isEdit = true;
      this.taskService.getTask(taskId).subscribe((task) => {
        this.task = task;
      });
    }
  }

  saveTask(): void {
    if (this.isEdit) {
      if (this.task.id) {
        this.taskService.updateTask(this.task.id, this.task).subscribe(() => {
          this.router.navigate(['/']);
        });
      } else {
        console.error('El ID de la tarea es undefined.');
      }
    } else {
      this.taskService.createTask(this.task).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
