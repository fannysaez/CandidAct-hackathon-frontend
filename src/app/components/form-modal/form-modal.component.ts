import { Component, EventEmitter, HostListener, Input, Output, } from '@angular/core';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.css',
})
export class FormModalComponent {
  @Input() title = 'Formulaire';
  @Output() closed = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }

  close(): void {
    this.closed.emit();
  }
}