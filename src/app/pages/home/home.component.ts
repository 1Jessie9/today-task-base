import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, effect, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { IonIcon, IonContent } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { briefcaseSharp, bookSharp, homeSharp, funnelSharp, add } from "ionicons/icons";
import { CardTaskComponent } from "src/app/shared/components/card-task/card-task.component";
import { HeaderComponent } from "src/app/shared/components/header/header.component";
import { SwiperOptions } from "swiper/types";
import { TaskTodo } from "src/app/core/models/task.interface";
import { TodoStoreService } from "src/app/core/services/todo-store.service";
import { CategoryWithCount } from "src/app/core/models/category.interface";

addIcons({
  bookSharp,
  briefcaseSharp,
  homeSharp,
  funnelSharp,
  add,
})
@Component({
  standalone: true,
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  imports: [
    IonIcon,
    IonContent,
    HeaderComponent,
    CardTaskComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage {
  private readonly router = inject(Router);
  private readonly todoStore = inject(TodoStoreService);

  public readonly categories = this.todoStore.categoriesSignal();
  public readonly tasks = this.todoStore.tasksSignal();

  public readonly pendingTasksCount = computed(
    () => this.tasks.length
  );

  swiperConfig: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 0,
  };

  handleCategory(category: CategoryWithCount) {
    this.router.navigate(['/category', category.id]);
  }

  navigateToCreateTask() {
    this.router.navigate(['/create-task']);
  }

  navigateToCreateCategory() {
    this.router.navigate(['/create-category']);
  }
}