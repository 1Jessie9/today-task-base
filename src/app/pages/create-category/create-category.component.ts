import { Component, inject, input, OnInit, signal } from "@angular/core";
import { HeaderComponent } from "src/app/shared/components/header/header.component";
import { IonContent, IonInput, IonButton, IonLabel, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { alarm, book, briefcase, calendar, heart, home, star } from "ionicons/icons";
import { TodoStoreService } from "src/app/core/services/todo-store.service";
import { Router } from "@angular/router";
import { NgModel } from "@angular/forms";

addIcons({
  home,
  star,
  heart,
  alarm,
  calendar,
  book,
  briefcase,
});
@Component({
  standalone: true,
  selector: "app-create-category",
  templateUrl: "./create-category.component.html",
  styleUrls: ["./create-category.component.scss"],
  imports: [IonIcon,
    IonLabel,
    HeaderComponent,
    IonContent,
    IonInput,
    IonButton,
  ],
})
export class CreateCategoryPage implements OnInit {
  private readonly todoStore = inject(TodoStoreService);
  private readonly router = inject(Router);

  readonly categoryId = input<string | null>();
  public colors = ["red", "blue", "green", "yellow", "purple", "orange"];
  public selectedColor = signal<string | null>(null);
  public icons = ["home", "star", "heart", "alarm", "calendar", "book", "briefcase"];
  public selectedIcon = signal<string | null>(null);
  public name = signal<string>('');

  async ngOnInit() {
    if (this.categoryId()) {
      const id = Number(this.categoryId());
      const category = await this.todoStore.getCategoryById(id);
      if (category) {
        this.name.set(category.name);
        this.selectedColor.set(category.color ?? 'blue');
        this.selectedIcon.set(category.icon ?? 'book');
      }
    }
  }

  inputName(ev: any) {
    this.name.set(ev!.target!.value);
  }

  selectColor(color: string) {
    this.selectedColor.set(color);
  }

  selectIcon(icon: string) {
    this.selectedIcon.set(icon);
  }

  async saveCategory() {
    const payload = {
      name: this.name(),
      color: this.selectedColor(),
      icon: this.selectedIcon(),
    };

    console.log(payload);
    if (this.categoryId()) {
      await this.todoStore.updateCategory(Number(this.categoryId()), payload);
    } else {
      await this.todoStore.createCategory(payload);
    }

    this.router.navigate(['/home']);
  }
}