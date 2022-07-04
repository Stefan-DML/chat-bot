import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[keyEnterPress]'
})
export class KeyEnterDirective {
  @Output('keyEnterEvent') public keyEnterEvent: EventEmitter<string> = new EventEmitter<any>()

  @HostListener('window:keydown.enter', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    console.log(event)
    this.keyEnterEvent.emit()
  }

}
