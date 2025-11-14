import { Component, input } from "@angular/core";
import { IonHeader, IonToolbar, IonTitle, IonBackButton, IonButtons } from "@ionic/angular/standalone";

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [
    IonButtons,
    IonBackButton, 
    IonHeader,
    IonToolbar,
    IonTitle,
  ]
})
export class HeaderComponent {
  readonly title = input.required<string>();
  readonly showBack = input<boolean>(false);
}