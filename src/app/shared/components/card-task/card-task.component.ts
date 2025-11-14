import { NgStyle } from "@angular/common";
import { Component, ElementRef, input, signal, ViewChild } from "@angular/core";
import { IonIcon } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { checkmarkDoneCircle, pencil, trash, checkmarkCircle } from "ionicons/icons";
import { PriorityEnum } from "src/app/core/models/priority.interface";
import { TaskTodo } from "src/app/core/models/task.interface";
import { createGesture, Gesture } from "@ionic/angular";

addIcons({
  checkmarkDoneCircle,
  pencil,
  trash,
  checkmarkCircle,
})
@Component({
  standalone: true,
  selector: "app-card-task",
  templateUrl: "./card-task.component.html",
  styleUrls: ["./card-task.component.scss"],
  imports: [
    IonIcon,
    NgStyle,
  ]
})
export class CardTaskComponent {
  @ViewChild('cardContent') cardContent!: ElementRef<HTMLElement>;
  private gesture?: Gesture;

  public readonly task = input.required<TaskTodo>();
  public readonly showCategory = input<boolean>(true);
  public readonly PriorityEnum = PriorityEnum;
  public showComplete = signal<boolean>(false);
  public showEdit = signal<boolean>(false);
  public translateX = signal<number>(0);
  private readonly threshold = 60;
  private readonly maxSwipe = 100;

  ngAfterViewInit(): void {
    this.gesture = createGesture({
      el: this.cardContent.nativeElement,
      gestureName: 'card-swipe',
      threshold: 0,
      onMove: (ev) => this.onMove(ev),
      onEnd: (ev) => this.onEnd(ev),
    });

    this.gesture.enable(true);
  }

  private onMove(ev: any) {
    let deltaX = ev.deltaX as number;
    if (deltaX > this.maxSwipe) deltaX = this.maxSwipe;
    if (deltaX < -this.maxSwipe) deltaX = -this.maxSwipe;

    this.translateX.set(deltaX);

    if (deltaX > 0) {
      this.showEdit.set(true);
      this.showComplete.set(false);
    } else if (deltaX < 0) {
      this.showComplete.set(true);
      this.showEdit.set(false);
    } else {
      this.showEdit.set(false);
      this.showComplete.set(false);
    }
  }

  private onEnd(ev: any) {
    const deltaX = ev.deltaX as number;

    if (deltaX > this.threshold) {
      this.showEdit.set(true);
      this.showComplete.set(false);
      this.translateX.set(this.maxSwipe + 50);
    } else if (deltaX < -this.threshold) {
      this.showComplete.set(true);
      this.showEdit.set(false);
      this.translateX.set(-this.maxSwipe);
    } else {
      this.resetSwipe();
    }
  }

  resetSwipe() {
    this.translateX.set(0);
    this.showComplete.set(false);
    this.showEdit.set(false);
  }
}