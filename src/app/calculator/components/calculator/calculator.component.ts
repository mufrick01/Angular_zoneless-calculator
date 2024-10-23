import { ChangeDetectionStrategy, Component, computed, inject, OnInit, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [
    CalculatorButtonComponent,
  ],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)'
  }
})
export class CalculatorComponent{
  private calculatorService = inject(CalculatorService);



  public resultText = computed(() => { return this.calculatorService.resultText() })
  public lastOperator = computed(() => { return this.calculatorService.lastOperator() })
  public subResultText = computed(() => { return this.calculatorService.subResultText() })


  public calculatorButtons = viewChildren(CalculatorButtonComponent);

  handleClick(key: string) {

    this.calculatorService.constructNumber(key);

  }

  // @HostListener(`document:keyup`,['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

    const keyEquivalent: Record<string, string> = {
      '*': 'x',
      '/': '÷',
      '`': '+/-',
      Enter: '=',
      Escape: 'C',

    }
    const key = event.key;
    const keyValue = keyEquivalent[key] ?? key
    key


    this.handleClick(keyValue);


    this.calculatorButtons().forEach(button => {
      button.keyPressedStyle(keyValue)
    })
  }
}
