// task-list.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: any[] = []; // Aquí almacenarás las tareas obtenidas del servidor
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Llama a tu API para obtener la lista de tareas
    this.http.get<any[]>(this.apiUrl + '/tasks').subscribe((data) => {
      this.tasks = data;
    });
  }

  editTask(id: string) {
    // Redirige a la página de edición de tarea con el ID de la tarea
    this.router.navigate(['/edit', id]);
  }

  viewDetails(id: string) {
    // Redirige a la página de detalles de tarea con el ID de la tarea
    this.router.navigate(['/details', id]);
  }

  deleteTask(id: string) {
    // Llama a tu API para eliminar la tarea por su ID y actualiza la lista de tareas
    this.http.delete(this.apiUrl + `/tasks/${id}`).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }
}
