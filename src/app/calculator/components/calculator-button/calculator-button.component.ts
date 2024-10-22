import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, input, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
    '[class.w-2/4]' : 'this.isDoubleSize()',
  }
})
export class CalculatorButtonComponent {

  public onClick = output<string>()
  public isPressed = signal(false)
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button')


  public isCommand = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value
  });


  public isDoubleSize = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value
  });

  // @HostBinding('class.w-2/4') get commandStyle() {
  //   return this.isDoubleSize();
  // }




  handleCLick() {
    if (!this.contentValue()?.nativeElement) return;

    const value = this.contentValue()!.nativeElement.innerHTML
    this.onClick.emit(value.trim());
  }



  public keyPressedStyle(key: string) {

    if (!this.contentValue()) return;

    const value = this.contentValue()!.nativeElement.innerHTML.trim();

    if(value !== key) return;

    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);

  }
}
