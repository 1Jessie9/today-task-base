import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from "@angular/core";
import { HeaderComponent } from "src/app/shared/components/header/header.component"
import { IonInput, IonSelect, IonSelectOption, IonButton, IonContent, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { bookSharp, briefcaseSharp, homeSharp } from "ionicons/icons";


addIcons({
  bookSharp,
  briefcaseSharp,
  homeSharp,
})
@Component({
  standalone: true,
  selector: "app-create-task",
  templateUrl: "./create-task.component.html",
  styleUrls: ["./create-task.component.scss"],
  imports: [
    IonContent,
    IonInput,
    HeaderComponent,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreateTaskPage {
  public categories = [
    {
      id: 1,
      icon: "book-sharp",
      name: "Estudio",
      taskCount: 12
    },
    {
      id: 2,
      icon: "briefcase-sharp",
      name: "Trabajo",
      taskCount: 8
    },
    {
      id: 3,
      icon: "home-sharp",
      name: "Hogar",
      taskCount: 5
    },
  ];
  public selectedCategory = signal<{
    id: number,
    icon: string,
    name: string,
  } | null>(null);

  handleCategory(category: any) {
    this.selectedCategory.set(category);
  }
}