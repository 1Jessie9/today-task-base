import { Component, inject, input, OnInit, signal } from "@angular/core";
import { HeaderComponent } from "src/app/shared/components/header/header.component";
import { IonContent, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { bookSharp } from "ionicons/icons";
import { CardTaskComponent } from "src/app/shared/components/card-task/card-task.component";
import { Category } from "src/app/core/models/category.interface";
import { Router } from "@angular/router";
import { TodoStoreService } from "src/app/core/services/todo-store.service";
import { TaskTodo } from "src/app/core/models/task.interface";

addIcons({
  bookSharp,
})
@Component({
  standalone: true,
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
  imports: [
    IonIcon,
    HeaderComponent,
    IonContent,
    CardTaskComponent,
  ]
})
export class CategoryPage implements OnInit {
  private readonly router = inject(Router);
  private readonly todoStore = inject(TodoStoreService);

  readonly categoryId = input.required<string>();
  public category = signal<Category | null>(null);
  public tasks = signal<TaskTodo[]>([]);

  async ngOnInit() {
    const id = Number(this.categoryId());

    const category = await this.todoStore.getCategoryById(id);
    this.category.set(category);

    const tasks = await this.todoStore.getTasksByCategory(id);
    this.tasks.set(tasks);
  }

  editCategory() {
    this.router.navigate(['/edit-category', this.categoryId()]);
  }
}