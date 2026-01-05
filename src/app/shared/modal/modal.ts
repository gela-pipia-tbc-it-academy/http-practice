import { AfterViewInit, Component, ElementRef, output, viewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal implements AfterViewInit {
  private dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  close = output<void>();

  ngAfterViewInit(): void {
    this.dialog().nativeElement.showModal();
  }

  onBackdropClick(event: MouseEvent) {
    const dialogElement = this.dialog().nativeElement;
    const rect = dialogElement.getBoundingClientRect();
    const clickedOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (clickedOutside) {
      this.close.emit();
    }
  }
}
